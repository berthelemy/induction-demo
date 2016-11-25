$(document).ready(function(){

    var menuEdge    = $('[class^="menu-edge"]');
    var gClass      = 'grid-menu-edge';
    var classes     = [
                      'grid-menu-edge',
                      'grid-menu-edge-top',
                      'grid-menu-edge-right',
                      'grid-menu-edge-bottom'   
                      ];
    
    // int setup
    menuEdge.wrapInner('<div class="menu-content"></div>')
    .append('<i class="fa fa-bars"></i>');
    
    menuEdge.on('click', function(e){
        e.stopPropagation();
    });
    
    menuEdge.find('.fa-bars').on('click', function(e){
        e.stopPropagation();
        
        // toggle the menu open or closed
        $(this).parent().toggleClass('open');
        
        // hide the other menus
        menuEdge.not($(this).parent()).removeClass('open');
        
        // append non-scrolling to the body
        if($(this).parent().hasClass('open')){
            $('html,body').addClass('noscroll');
        }else{
            $('html,body').removeClass('noscroll');
        }
        
        // close the submenus
        closeSubMenus();
        
        // find what direction we are opening the menu
        gClass = 'grid-'+$(this).parent().attr('class');
        $.each(classes, function(index){
            if(gClass != classes[index]){
                $('.grid').removeClass(classes[index]);
            }
        });
        $('.grid').toggleClass(gClass);
        
    });
    
    function closeSubMenus(){
        menuEdge.find('.edge-nav ul').slideUp();
    }
    
    // click outside menu - hide the menu
    $(document).on('click', function(e){
        menuEdge.removeClass('open');
        $('html,body').removeClass('noscroll');
        closeSubMenus();
        $.each(classes, function(index){
            $('.grid').removeClass(classes[index]);
        });
    });
    
    // click a submenu item with children
    // expand collapse the submenu
    menuEdge.find('.edge-nav li').on('click', function(e){
        e.stopPropagation();
        $(this).find('ul:first').slideToggle();
    });
    
});