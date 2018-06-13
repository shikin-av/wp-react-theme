<?php
// Thumbnail Support
add_theme_support('post-thumbnails');


function scriptsAndStyles(){
    wp_enqueue_style("style", get_stylesheet_uri());
    wp_enqueue_style("bootstrap-css", "https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css");
    wp_enqueue_style("react-slick-carousel-css", "https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css");
    wp_enqueue_style("react-slick-carousel-theme", "https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css");
    wp_enqueue_style("font-awesome", "https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css");
    wp_enqueue_script("jquery", "https://code.jquery.com/jquery-3.3.1.slim.min.js");
    wp_enqueue_script("bootstrap-js", "https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js");
}
// load scripts & styles
add_action("wp_enqueue_scripts", "scriptsAndStyles");

// Menu
add_theme_support( 'menus' );

function get_menu(){
    return wp_get_nav_menu_items('menu');
}

add_action( 'rest_api_init', function () {
        register_rest_route( 'api/v1', '/menu', array(
        'methods' => 'GET',
        'callback' => 'get_menu',
    ) );
});

// get Products by Category
function get_products_by_category($req){
    $category_name = urldecode($req->get_param('category'));
    $category_name = clear($category_name);
    $category = get_term_by('slug', $category_name, 'product_cat', 'ARRAY_A'); 
    $category_id = $category["term_id"];

    // get products
    $args = array(
        'post_type'             => 'product',
        'post_status'           => 'publish',
        'ignore_sticky_posts'   => 1,
        'posts_per_page'        => '12',
        'tax_query'             => array(
            array(
                'taxonomy'      => 'product_cat',
                'field' => 'term_id',
                'terms'         => $category_id,
                'operator'      => 'IN'
            ),
            array(
                'taxonomy'      => 'product_visibility',
                'field'         => 'slug',
                'terms'         => 'exclude-from-catalog',
                'operator'      => 'NOT IN'
            )
        )
    );
    
    $loop = new WP_Query( $args );  
    $products = [];
    $i = 0;  
    while ( $loop->have_posts() ){ 
        $loop->the_post();
        global $product;
        $products[$i]["ID"] =                   $loop->post->ID;
        $products[$i]["name"] =                 $product->get_title();
        $products[$i]["price"] =                $product->get_price();
        $products[$i]["thumbnail"] =            get_the_post_thumbnail_url($loop->post->ID, 'shop_catalog');
        $products[$i]["short_description"] =    $loop->post->post_excerpt;
        //$products[$i]["content"] = $loop->post->post_content;
        $i++;
    }
    return rest_ensure_response($products);
}
add_action( 'rest_api_init', function () {
    register_rest_route( 'api/v1', '/products/(?P<category>\S+)', array(
        'methods' => 'GET',
        'callback' => 'get_products_by_category',
    ));
});

// get Subcategories
function get_subcategories($req){
    $category_name = urldecode($req->get_param('category'));
    $category_name = clear($category_name);
    $category = get_term_by('slug', $category_name, 'product_cat', 'ARRAY_A'); 
    $category_id = $category["term_id"];

    $args = array(
        'orderby' => 'name',
        'parent' => $category_id,
        'taxonomy' => 'product_cat',
        'hide_empty' => 1
    );
    $categories = get_categories( $args );
    
    $subcategories = [];

    foreach ( $categories as $category ) {
        array_push($subcategories, $category);
    }
    return rest_ensure_response($subcategories);
}
add_action( 'rest_api_init', function () {
    register_rest_route( 'api/v1', '/subcategories/(?P<category>\S+)', array(
        'methods' => 'GET',
        'callback' => 'get_subcategories',
    ));
});


// get Category Cyrillic Name
function get_category_name($req){
    $category_name = urldecode($req->get_param('category'));
    $category_name = clear($category_name);
    $category = get_term_by('slug', $category_name, 'product_cat', 'ARRAY_A');
    return $category["name"];
}
add_action( 'rest_api_init', function () {
    register_rest_route( 'api/v1', '/categoryname/(?P<category>\S+)', array(
        'methods' => 'GET',
        'callback' => 'get_category_name',
    ));
});


// get Page Content
function get_page_content_by_slug($req){
    $page_slug = urldecode($req->get_param('page'));
    $page_slug = clear($page_slug);
    $page_data = get_page_by_path($page_slug);
    
    /*$page_content = [];
    $page_content["id"] = $page_data->ID;
    $page_content["title"] = $page_data->post_title;
    $page_content["content"] = $page_data->post_content;*/

    return rest_ensure_response($page_data);
}
add_action( 'rest_api_init', function () {
    register_rest_route( 'api/v1', '/page/(?P<page>\S+)', array(
        'methods' => 'GET',
        'callback' => 'get_page_content_by_slug',
    ));
});


// for Product Page
function get_product_by_id($req){
    $id = urldecode($req->get_param('id'));
    $id = clear($id);
    $product = wc_get_product( $id );
    
    $result["ID"] =                 $id;
    $result["name"] =               $product->get_title();
    $result["price"] =              $product->get_price();
    $result["short_description"] =  $product->get_short_description();
    $result["content"] =            $product->get_description();
    $result["thumbnail"] =          get_the_post_thumbnail_url($id, 'shop_catalog');

    $attachment_ids = $product->get_gallery_attachment_ids();
    $i = 0;
    foreach( $attachment_ids as $attachment_id ) {
        $result["images"][$i] = wp_get_attachment_url($attachment_id);
        $i++;
    }

    return rest_ensure_response($result);
}
add_action( 'rest_api_init', function () {
    register_rest_route( 'api/v1', '/product/(?P<id>\d+)', array(
        'methods' => 'GET',
        'callback' => 'get_product_by_id',
    ));
});


// for WP Customizer
add_action('customize_register', function($customizer){
    $customizer->add_section(
        'section_yami',
        array(
            'title' => 'Настройки Ями',
            'priority' => 11,
        )
    );

    // test text TODO DELETE
    /*$customizer->add_setting(
        'example_textbox',
        array('default' => 'сайт Ями')
    );
    $customizer->add_control(
        'example_textbox',
        array(
            'label' => 'Настройка текста',
            'section' => 'section_yami',
            'type' => 'text',
        )
    );*/

    $customizer->add_setting('logoUrl');
    $customizer->add_control(
        new WP_Customize_Image_Control(
            $customizer,
            'logoUrl',
            array(
                'label' => 'Логотип',
                'section' => 'section_yami',
                'settings' => 'logoUrl'
            )
        )
    );
});


// AJAX

// define ajaxurl (ajax.url)
add_action( 'wp_enqueue_scripts', 'define_ajaxurl', 99 );

function define_ajaxurl(){
    wp_localize_script( 'bootstrap-js', 'ajax',     // add to this script
        array(
            'url' => admin_url('admin-ajax.php')
        )
    );
}

// callme
add_action('wp_ajax_callme_handler', 'callme_handler');         // authorised users
add_action('wp_ajax_nopriv_callme_handler', 'callme_handler');  // unauthorised users

function callme_handler(){
    $name = clear($_POST['name']);
    $phone = clear($_POST['phone']);

    $message = 'Клиент просит перезвонить: ' . $name . ' тел. ' . $phone;
    $admin_email = get_option('admin_email');
    wp_mail($admin_email, 'Клиент просит перезвонить', $message);
    echo 'Наш менеджер свяжется с Вами в самое ближайшее время';
    wp_die();
}

// validate data
function clear($var){
    if (preg_match("/script|http|&lt;|&gt;|&lt;|&gt;|SELECT|UNION|UPDATE|exe|exec|INSERT|tmp/i", $var)) {
        return '';
    }
    return $var;
}

?>