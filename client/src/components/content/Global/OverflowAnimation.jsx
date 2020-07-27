const OverflowAnimation = () => {
    document.body.style = 'overflow: hidden'
    setTimeout(()=>{
        document.body.style = 'overflow: auto' 
    }, 3000)
}

export default OverflowAnimation