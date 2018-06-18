<?php get_header(); ?>

<div id="root"></div>

<script>
    // Singleton
    function Global(){
        if(Global.instance){
            return Global.instance;
        }
        Global.instance = this;
        
        this.menu = null;
        this.promotions = null;
        this.logoUrl = null;
        this.yandexMoneyNumber = null;
    }
    var global = new Global();

    <?php   
        // load WP resources for React        
        // Menu
        $menu = get_menu();
        $menu_json = json_encode($menu);
        echo "global.menu = " . $menu_json . ";\n";     //TODO get only Text and Link
        
        // Promotions
        $promotions = array(
            'post_type' => 'promotions',
            'publish' => true,
            'paged' => get_query_var('paged'),
        );
        $promotions = get_posts($promotions);     // query_posts() get_posts()

        foreach($promotions as $key => $item){
            $img_id = get_post_meta($item->ID, 'img', true);
            $img_url = wp_get_attachment_url($img_id);
            $promotions[$key]->img = $img_url;

            $url_target = get_post_meta($item->ID, 'urlTarget', true);
            $promotions[$key]->urlTarget = $url_target;
        }
        $promotions_json =  json_encode($promotions);
        echo "global.promotions = " . $promotions_json . ";\n";

        // Logo (wp customizer)
        $logo_url = get_theme_mod('logoUrl', '');
        echo "global.logoUrl = '" . $logo_url . "';\n";

        // Yandex Money Number (wp customizer)
        $yandex_money_number = get_theme_mod('yandexMoneyNumber', '410015769150363');
        echo "global.yandexMoneyNumber = '" . $yandex_money_number . "';\n";

    ?>
</script>

<script src="<?php echo get_template_directory_uri(); ?>/dist/js/bundle.js"></script>

<?php get_footer(); ?>
