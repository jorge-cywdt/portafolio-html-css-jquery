/*************** Modo estricto con Jquery ****************/
// Con el modo estricto cargara la página y todo lo que no este dentro de la función, luego lo que este dentro
$(document).ready(function() {
    /*************** Objetos ****************/
    var banner = {
        padre: $('#banner'), // id="banner"
        numeroSlides: $('#banner').children('.slide').length, // id="banner", class="slide"
        posicion: 1
    }
    console.log(banner.padre);
    console.log(banner.numeroSlides);

    var info = {
        padre: $('#info'), // id="info"
        numeroSlides: $('#info').children('.slide').length, // id="info", class="slide"
        posicion: 1
    }
    console.log(info.padre);
    console.log(info.numeroSlides);

    /*************** Configuración inicial ****************/
    banner.padre.children('.slide').first().css({
        'left': '0'
    });

    info.padre.children('.slide').first().css({
        'left': '0'
    });

    /*************** Alto de la Banderola deslizante e Información deslizante ****************/
    var altoBanner = function() {
        var alto = banner.padre.children('.slide').outerHeight();
        console.log(alto);
        banner.padre.css({
            'height': alto + 'px'
        });
    }
    altoBanner();

    $(window).resize(function() {
        altoBanner();
    });

    var altoInfo = function() {
        var alto = info.padre.children('.active').outerHeight();
        console.log(alto);
        info.padre.animate({ // Animacion en Información deslizante
            'height': alto + 'px'
        });
    }
    altoInfo();

    $(window).resize(function() {
        altoInfo();
    });

    /*************** Botones verdes ****************/
    $('#info').children('.slide').each(function() { // Por cada uno
        $('#botones-verdes').append('<span>'); // Agregaremos la etiqueta <span>, no podemos colocar solo span, porque se agregaria solo la palabra y no la etiqueta
    });

    $('#botones-verdes').children('span').first().addClass('active');

    /*************** Banderola deslizante ****************/
    /***** banner-next *****/
    $('#banner-next').on('click', function(e) {
        e.preventDefault(); // Evitamos que se ejecute la acción predeterminada del evento
        banner.padre.children().not('.active').css({ // Seleccionamos todos los slides que no tengan la clase .active y los posicionamos a la derecha
            'left': '100%'
        });

        if (banner.posicion < banner.numeroSlides) { // Si la posición es menor al numero de slides, es decir 4

            $('#banner .active').removeClass('active').next().addClass('active').animate({ // Quitamos la clase active, se la ponemos al siguiente elemento y lo animamos
                'left': '0'
            });

            $('#banner .active').prev().animate({ // Animamos el slide anterior para que se deslice hacia la izquierda
                'left': '-100%'
            });

            banner.posicion = banner.posicion + 1; // banner.posicion obtiene el valor de 4

        } else { // Si la posición es igual a 4

            $('#banner .active').animate({ // Hacemos que el slide activo (es decir el último), se anime hacia la izquierda
                'left': '-100%'
            });

            $('#banner .active').removeClass('active'); // Quitamos la clase active, se la ponemos al primer elemento y lo animamos
            banner.padre.children('.slide').first().addClass('active').animate({
                'left': '0'
            });

            banner.posicion = 1; // Reseteamos a la posición 1

        }
    });
    /***** banner-prev *****/
    $('#banner-prev').on('click', function(e) {
        e.preventDefault();
        banner.padre.children().not('.active').css({ // Seleccionamos todos los slides que no tengan la clase .active y los posicionamos a la izquierda
            'left': '-100%'
        });

        if (banner.posicion > 1) { // Si la posición es mayor a 1

            $('#banner .active').animate({ // Hacemos que el slide activo, se anime hacia la derecha
                'left': '100%'
            });

            $('#banner .active').removeClass('active').prev().addClass('active').animate({ // Quitamos la clase active, se la ponemos al anterior elemento y lo animamos
                'left': '0'
            });

            banner.posicion = banner.posicion - 1; // Reseteamos a la posición 1

        } else { // Si la posición es igual a 1

            $('#banner .active').animate({ // Hacemos que el slide activo, se anime hacia la derecha
                'left': '100%'
            });

            $('#banner .active').removeClass('active'); // Quitamos la clase active, se la ponemos al ultimo elemento y lo animamos
            banner.padre.children('.slide').last().addClass('active').animate({
                'left': '0'
            });

            banner.posicion = banner.numeroSlides; // banner.posicion obtiene el valor de 4

        }
    });

    /*************** Información deslizante ****************/
    /***** info-next *****/
    $('#info-next').on('click', function(e) {
        e.preventDefault();
        info.padre.children().not('.active').css({ // Seleccionamos todos los slides que no tengan la clase .active y los posicionamos a la derecha
            'left': '100%'
        });

        if (info.posicion < info.numeroSlides) { // Si la posición es menor al numero de slides, es decir 4

            $('#info .active').removeClass('active').next().addClass('active').animate({ // Quitamos la clase active, se la ponemos al siguiente elemento y lo animamos
                'left': '0'
            });

            $('#info .active').prev().animate({ // Animamos el slide anterior para que se deslice hacia la izquierda
                'left': '-100%'
            });

            $('#botones-verdes').children('.active').removeClass('active').next().addClass('active'); // id="botones-verdes"

            info.posicion = info.posicion + 1; // info.posicion obtiene el valor de 4

        } else { // Si la posición es igual a 4

            $('#info .active').animate({ // Hacemos que el slide activo (es decir el último), se anime hacia la izquierda
                'left': '-100%'
            });

            $('#info .active').removeClass('active'); // Quitamos la clase active, se la ponemos al primer elemento y lo animamos
            info.padre.children('.slide').first().addClass('active').animate({
                'left': '0'
            });

            $('#botones-verdes').children('.active').removeClass('active'); // id="botones-verdes"
            $('#botones-verdes').children('span').first().addClass('active'); // id="botones-verdes"

            info.posicion = 1; // Reseteamos a la posición 1

        }
        altoInfo();
    });
    /***** info-prev *****/
    $('#info-prev').on('click', function(e) {
        e.preventDefault();
        info.padre.children().not('.active').css({ // Seleccionamos todos los slides que no tengan la clase .active y los posicionamos a la izquierda
            'left': '-100%'
        });

        if (info.posicion > 1) { // Si la posición es mayor a 1

            $('#info .active').animate({ // Hacemos que el slide activo, se anime hacia la derecha
                'left': '100%'
            });

            $('#info .active').removeClass('active').prev().addClass('active').animate({ // Quitamos la clase active, se la ponemos al anterior elemento y lo animamos
                'left': '0'
            });

            $('#botones-verdes').children('.active').removeClass('active').prev().addClass('active'); // id="botones-verdes"

            info.posicion = info.posicion - 1; // Reseteamos a la posición 1

        } else { // Si la posición es igual a 1

            $('#info .active').animate({ // Hacemos que el slide activo, se anime hacia la derecha
                'left': '100%'
            });

            $('#info .active').removeClass('active'); // Quitamos la clase active, se la ponemos al ultimo elemento y lo animamos
            info.padre.children('.slide').last().addClass('active').animate({
                'left': '0'
            });

            $('#botones-verdes').children('.active').removeClass('active'); // id="botones-verdes"
            $('#botones-verdes').children('span').last().addClass('active'); // id="botones-verdes"

            info.posicion = info.numeroSlides; // info.posicion obtiene el valor de 4

        }
        altoInfo();
    });
});
