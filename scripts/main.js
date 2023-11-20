const canvas = document.querySelector('canvas')
/* utiliza queri por que como no tiene en el inbdex ningun tipo de class id nin nada lo hace con query selector y lo hace directamente  */
const ctx =canvas.getContext('2d')

/* esto puede que falte en el examen */
const width = canvas.width = window.innerWidth
const height = canvas.height = window.innerHeight
/* Lo que hacen es definir el ancho y el alto cuando desplegamos en local o en produccion la aplicacion */

const random = (min, max) => {
    return Math .floor(Math.random() * (max - min +1)) + min
}

/* Estp son fuinciones... */
const randomRGB = () =>{
    return `rgb(${random(0, 255)},${random(0, 255)})`
}

/* Concepto de Clase */
class Ball{
    
    constructor(x, y, velX, velY, color, size){
        this.x = x;
        this.y = y;
        this.velX = velX;
        this.velY = velY;
        this.color = color;
        this.size = size;
    }    
    
    draw(){
        ctx.beginPath/* Inicio de la ruta */
        /* Genera una nueva posicion. Se llama al contexto y por cada pelota que se genere se dibuja */
        ctx.fillStyle = this.color
        /* El color de la clase bola */
        ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI)
        /* El 0 es por el color */
        /* this, por cada bola que se crea, no es un caso real es un caso utopico */
        ctx.fill()
    }

    update(){
        //Verifica la posicion x de la pelota mas su tamañ supera el ancho del lienzo
        if((this.x + this.size) >= width) {
            // Si hay colision con el borde derecho
            this.velX = -(Math.abs(this.velX))
        }

        // Verifica si la posicion x de la pelota menos su tamaño es menor o igual a cero
        if((this.x - this.size) <= 0) {
            // Si hay colision con el borde izquierdo se invierte la direccion horizontal
            this.velX = (Math.abs(this.velX))
        }

        if((this.y + this.size) >= height) {
            this.velY = -(Math.abs(this.velY))
        }

        if((this.y - this.size) <= 0) {
            this.velY = Math.abs(this.velY)
        }

        // Actualiza las coordenadas de la pelota segun las velocidades actuales.
        this.x += this.velX;
        this.y += this.velY
    }

    collisionDetect() {
        for(const ball of balls){
            // Verificamos si la pelota actual no es la misma que la pelota de la iteraccion
            if(!(this === ball)){
                const dx = this.x - ball.x
                const dy = this.y - ball.y
            }
            
            // Calcular la distancia entre el centro de la pelota actual y la pelota con iteraccion
            const distance = Math.sqrt(dx * dx + dy * dy)

            if(distance < this.size + ball.size){
                ball.color = this.color = randomRGB()
            }
        }
    }
}

const balls = []

while(balls.length < 25){
    const size = random(10, 20)

    const ball = new Ball(
        // Generar la posicion en x de forma aleatoria para esta bola en el lienzo
        random(0 + size, width - size),
        random(0 + size, width - size),
        // La velocidad en la direccion de x se establece de forma aleatoria entre 7 y -7
        random(-7,7),
        random(-7,7),
        randomRGB,
        size
    )

    balls.push(ball)
}

// Funcion que define el bucle principal del programa
const loop = () => {
        // Establece un color de fondo semitransparente
        ctx.fillStyle = 'rgba(0, 0, 0, 0.25)'
        ctx.fillRect(0, 0, width, height)

        for(const ball of balls){
            ball.draw() // Dibuja la pelota.
            ball.update() // Actualiza la posicion de la pelota
            ball.collisionDetect() // Verificar las colisiones de la pelota con otras
        }

        requestAnimationFrame(loop) // Solicitar al navegador que llamea la funcion 'loop'
}

loop() // Inicia el bucle principal