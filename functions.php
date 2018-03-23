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
        $products[$i]["ID"] = $loop->post->ID;
        $products[$i]["name"] = $product->get_title();
        $products[$i]["price"] = $product->get_price();        
        $products[$i]["thumbnail"] = get_the_post_thumbnail_url($loop->post->ID, 'shop_catalog');
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
        //$category["parent_name"] = 
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
    $category = get_term_by('slug', $category_name, 'product_cat', 'ARRAY_A');
    return $category["name"];
}
add_action( 'rest_api_init', function () {
    register_rest_route( 'api/v1', '/categoryname/(?P<category>\S+)', array(
        'methods' => 'GET',
        'callback' => 'get_category_name',
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
?>