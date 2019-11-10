class SliderCarousel {
    constructor(
        {selector,
        wrap,
        next,
        prev,
        slidesToShow = 3,
        position = 0,
        infinity= false,
        responsive = []
        }
        ){
        this.selector = document.querySelector(selector)
        this.wrap = document.querySelector(wrap)
        this.slides = document.querySelector(wrap).children
        this.next = document.querySelector(next)
        this.prev = document.querySelector(prev)
        this.slidesToShow = slidesToShow
        this.responsive = responsive
        this.options = {
            position,
            widthSlide: (100 / this.slidesToShow ),
            infinity,
            maxPosition: this.slides.length - this.slidesToShow
        }
    }
    init(){
        this.addClasses()
        this.addStyles()
        if(this.prev && this.next){
            this.controllSlider()
        } 
        else {
            this.addArrow()
        }
        if(this.responsive){
            this.responseInit()
        }
    }
    addClasses(){
        this.selector.classList.add('slider');
        this.wrap.classList.add('slider__wrap');
        for( const item of this.slides){
            item.classList.add('slider__item-js')
        }
    }
    addStyles(){
        let style = document.querySelector('#sliderCarusel-style')
        if(!style) {
            style = document.createElement('style');
            style.id = 'sliderCarusel-style';
        }
        
        style.textContent = `
        .slider {
            overflow: hidden !important;
        }
        .slider__wrap{
            display: flex !important;
            transition: transform 0.5s !important;
            will-change: transform !important;
        }
        .slider__item-js{
            margin: 10px auto !important;
            flex: 0 0 ${this.options.widthSlide}% !important;
        }
        `
        document.head.appendChild(style)
    }
    controllSlider(){
        this.prev.addEventListener('click', this.prevSlider.bind(this))
        this.next.addEventListener('click', this.nextSlider.bind(this))
    }
    prevSlider(){
        if( this.options.infinity || this.options.position > 0) {
            --this.options.position;
            if(this.options.position < 0){
                this.options.position = this.options.maxPosition;
            }
            this.wrap.style.transform = `translateX(-${this.options.position * this.options.widthSlide}% `
        }
    }
    nextSlider(){
        if(this.options.infinity || this.options.position < this.options.maxPosition) {
            ++this.options.position;
            if(this.options.position > this.options.maxPosition){
                this.options.position = 0;  
            }
            this.wrap.style.transform = `translateX(-${this.options.position * this.options.widthSlide}%`
        }
    }
    addArrow(){
        this.prev = document.createElement('button')
        this.next = document.createElement('button')
        this.prev.setAttribute('aria-label', 'prev_btn');
        this.next.setAttribute('aria-label', 'next_btn');
        this.prev.className = 'slider__prev';
        this.next.className = 'slider__next';
        this.selector.appendChild(this.prev)
        this.selector.appendChild(this.next)

        const style = document.createElement('style');
        style.textContent = `
        .slider__prev,.slider__next{
            margin: 0 10px;
            border: 20px solid transparent;
            background: transparent;
            cursor: pointer
        }
        .slider__next {
            border-left-color: #fff;
            position:absolute;
            right: 0
        }
        .slider__prev {
            border-right-color: #fff;
            left: 0
        }
        .slider__prev:hover,
        .slider__next:hover,
        .slider__prev:focus,
        .slider__next:focus{
            background: transparent;
            outline: transparent;
        }
        `
        document.head.appendChild(style)

        this.controllSlider()
        }
    responseInit(){
        const slidesToShowDefault = this.slidesToShow;
        const allRespone = this.responsive.map( item => item.breakpoint)
        const maxResponse = Math.max(...allRespone)

        const checkResponse = () => {
            const widthWindow = document.documentElement.clientWidth;
            if(widthWindow < maxResponse) {
                for(let i = 0; i < allRespone.length; i++) {
                    if(widthWindow < allRespone[i]){
                    this.slidesToShow = this.responsive[i].slidesToShow;
                    this.options.widthSlide = Math.floor(100 / this.slidesToShow)
                    this.addStyles()
                    }
                    
                }
            }
            else {
                this.slidesToShow = slidesToShowDefault;
                this.options.widthSlide = Math.floor(100 / this.slidesToShow)
                this.addStyles()
                }
        };
        checkResponse()
        window.addEventListener('resize', checkResponse)
    }
}
(function(){
    const btn = document.querySelector('#btn')
    const dots = document.querySelector('#dots')
    const more = document.querySelector('#more')
    const p = document.querySelector('.hero__description')
    btn.addEventListener('click',()=>{
        if(dots.style.display == 'none'){
            dots.style.display = 'inline'
            btn.innerHTML = 'Подробнее'
            p.style.height = '100px'
        }
        else {
            dots.style.display = 'none'
            btn.innerHTML = 'Скрыть'
            p.style.height = '270px'
        }
    })
})()





