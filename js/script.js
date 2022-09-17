let carrito       = [];
let prendas = [];

const url = './js/prendas.json';

fetch(url)
    .then(respuesta => respuesta.json())
    .then(resultado =>{

        prendas = resultado;

        inicializarIndex();
    } );

document.addEventListener('DOMContentLoaded', () => {
    carrito = JSON.parse( localStorage.getItem('carrito') ) || [];

})


function inicializarIndex(){
    const tops = document.getElementById("catalogo");

    let contenido = "";

    prendas.forEach(prenda => {
        contenido = contenido + 

        '<div class="col-md-4 text-center wow animate__fadeIn animate__delay-3s">' +
        '<figure class="figure">' + 
        '<img src="' + prenda.img + '" class="figure-img img-fluid" alt="' + prenda.tipo + " " + prenda.nombre + '">' +
        '<figcaption class="figure-caption"><h6 class="mt-2 fw-bold">' + prenda.tipo + " " + prenda.nombre + '</h6><p class="precioPrenda">' + "$" + prenda.precio + '</p><button class="botonComprar">AÑADIR AL CARRITO</button></figcaption></figure></div>'
    });
    tops.innerHTML = contenido;
    inicializarBoton();

}

function inicializarBoton(){
    let boton = document.getElementsByClassName("botonComprar");

    prendas.forEach((prenda, i) => {
        boton[i].onclick = () => {
            Swal.fire(
                prenda.tipo + " " + prenda.nombre + " en el carrito!",
              );
              console.log(prenda.tipo + " " + prenda.nombre + " en el carrito");
            let repetidos = carrito.find(item => item.id == prenda.id);
            if (repetidos){
                repetidos.cantidad = repetidos.cantidad + 1;
            }
            else {
                prenda.cantidad = 1;
                carrito.push(prenda);
            }
              localStorage.setItem('carrito', JSON.stringify(carrito));
        };

    });

}

function mostrarCarrito(){

    let compra = document.getElementById("iconoCarrito");
    compra.onclick = () => {
        let listado = "";
        let total = 0;

        if (carrito.length == 0){
            Swal.fire(
                "El carrito está vacío :("
            )
            return;
        }

        carrito.forEach(prenda => {
            listado = listado + 
    
            '<div><img src="' + prenda.img + '" class="figure-img img-fluid col-4" alt="' + prenda.tipo + " " + prenda.nombre + '">' + '<p class="mt-2 fw-bold">' + prenda.tipo + " " + prenda.nombre + '</p><p>Precio (por unidad): $' + prenda.precio + ' / Cantidad: ' + prenda.cantidad + '</p></div>';
            total = total + (prenda.cantidad*prenda.precio);
        });

        listado = listado + '<p class="fw-bold">Total: $' + total + '</p>';
        // Swal.fire(
        //     listado
        //   );
          
          const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
              confirmButton: 'btn btn-success',
              cancelButton: 'btn btn-danger'
            },
            buttonsStyling: false
          })
          
          swalWithBootstrapButtons.fire({
            title: 'Carrito',
            html: listado,
            showCancelButton: true,
            confirmButtonText: 'Comprar',
            cancelButtonText: 'Vaciar carrito',
          }).then((result) => {
            if (result.isConfirmed) {
              swalWithBootstrapButtons.fire(
                'Muchas gracias por tu compra :)',
                'Te enviaremos un mail con los detalles de tu pedido.',
                'success'
              )
            }
            carrito = [];
            localStorage.setItem('carrito', JSON.stringify(carrito));
          })
    };
}

mostrarCarrito();
