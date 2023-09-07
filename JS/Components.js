
export const Header = () =>{
    return `
    <div id="header-logo">
        <img src="../Images/logo.png" alt="logo" onclick="window.location.href = 'http://127.0.0.1:5500/HTML/Index.html'">
    </div>

    <form class="search-bar" action="Busqueda.html">
        <select name="tag" id="">
            <option value="p">Pokemon</option>
            <option value="g">Generacion</option>
            <option value="a">Habilidad</option>
            <option value="t">Tipo</option>
        </select>
        <input  name="query" id="searchInput" type="text" placeholder="Estoy buscando...">
    </form>

    <div class="header-icons" onclick="window.location.href = 'http://127.0.0.1:5500/HTML/Favorito.html'">
        <span class="material-symbols-outlined">favorite</span>
        <h3>Favoritos</h3>
    </div>
    
    <div class="header-icons" onclick="window.location.href = 'http://127.0.0.1:5500/HTML/Carrito.html'">
        <span class="material-symbols-outlined" id="carrito-icono">shopping_cart</span>
        <h3>Carrito</h3>
    </div>
    `
}

export const SubHeader = () =>{
    return `
        <div class="sub-header-location">
            <span class="material-symbols-outlined header-icon">location_on</span>
            <h2>Enviar a Ash Ketchum - Pueblo Paleta 123</h2>
        </div>
        <span class="material-symbols-outlined header-icon">arrow_forward_ios</span>
    `
}

export const Footer = () =>{
    return `
    <section id="app-download">
        <img src="../images/logo.png" alt="logo">
        <h2>¡Descarga la Aplicacion!</h2>
    </section>

    <section id="footer-links">
        <article>
        <a href="#" class="footer-a">Mi Cuenta</a>
        <a href="#" class="footer-a">Historial</a>
        <a href="#" class="footer-a">Favoritos</a>
        <a href="#" class="footer-a">Categorias</a>
        <a href="#" class="footer-a">Ayuda</a>
        </article>
        <article>
        <a href="#" class="footer-a">Mis Compras</a>
        <a href="#" class="footer-a">Ofertas</a>
        <a href="#" class="footer-a">Tiendas Oficiales</a>
        <a href="#" class="footer-a">Poke Puntos</a>
        <a href="#" class="footer-a">Vender</a>
        </article>
    </section>
    <hr>
    <div id="linkMap">

        <section id="footer-map">
            <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d6542.623879211962!2d-57.95781654574375!3d-34.92371287649642!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x8e5a62b28764b5ef!2sCatedral%20de%20La%20Plata!5e0!3m2!1ses-419!2sar!4v1665931945345!5m2!1ses-419!2sar" width="1250" height="500" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
        </section>

        <hr>

        <section id="footer-bottom">
            <a href="#" class="footer-a">Terminos y Condiciones</a>
            <a href="#" class="footer-a">Como cuidamos tu privacidad</a>
            <a href="#" class="footer-a">Accesibildad</a>
            <a href="#" class="footer-a">Informacion al usuario</a>
            <a href="#" class="footer-a">Defensa al consumidor</a>
        </section>
    </div>
    `
}

export const Card1 = (name,number,price,img) =>{
    return ` 
    <article class="card1" onclick="window.location.href = 'http://127.0.0.1:5500/HTML/Pokemon.html?n=${name}';">
        <div class="card1-img">
            <img src="${img}" alt="">
        </div>
        <div class="card1-info">
            <h2>#${number} ${name}</h2>
            <h3>$${price}</h3>
            <h4>Envio gratis</h4>
        </div>
    </article>
    `
}

export const Card2 = (name,number,price,img) =>{
    return ` 
    <article class="card2" onclick="window.location.href = 'http://127.0.0.1:5500/HTML/Pokemon.html?n=${name}';">
        <div class="card2-img">
            <img src="${img}" alt="">
        </div>
        <div class="card2-info">
            <h3>$${price}</h3>
            <h2>#${number} ${name}</h2>
            <h4>Envio gratis</h4>
        </div>
    </article>
    `
}

export const Card3 = (name,number,price,img) =>{
    return ` 
    <article class="card3" onclick="window.location.href = 'http://127.0.0.1:5500/HTML/Pokemon.html?n=${name}';">
        <div class="card3-img">
            <img src="${img}" alt="">
        </div>
        <div class="card3-info">
            <h2>#${number} ${name}</h2>
            <h3>$${price}</h3>
            <h4>Envio gratis</h4>
        </div>
    </article>
    `
}

export const CardF = (name,number,price,img) =>{
    return ` 
    <article class="cardF" onclick="window.location.href = 'http://127.0.0.1:5500/HTML/Pokemon.html?n=${name}';">
        <div class="cardF-img">
            <img src="${img}" alt="">
        </div>
        <div class="cardF-info">
            <h2>#${number} ${name}</h2>
            <h3>$${price}</h3>
            <h4>Envio gratis</h4>
        </div>
    </article>
    `
}

export const CardC = (name,number,price,img) =>{
    return ` 
    <article class="cardC" onclick="window.location.href = 'http://127.0.0.1:5500/HTML/Pokemon.html?n=${name}';">
        <div class="cardC-img">
            <img src="${img}" alt="">
        </div>
        <div class="cardC-info">
            <h2>#${number} ${name}</h2>
            <div>
                <h3>$${price}</h3>
                <h4>Envio gratis</h4>
            </div>
        </div>
    </article>
    `
}

export const CardM = (name,number,price,img) =>{
    return ` 
    <article class="cardM" onclick="window.location.href = 'http://127.0.0.1:5500/HTML/Pokemon.html?n=${name}';">
        <div class="cardM-img">
            <img src="${img}" alt="">
        </div>
        <div class="cardM-info">
            <h2>#${number} ${name}</h2>
            <h3>$${price}</h3>
            <h4>Envio gratis</h4>
        </div>
    </article>
    `
}
