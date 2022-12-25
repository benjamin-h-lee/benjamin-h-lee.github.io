
const scrollToId = (id) => {
    const el = document.getElementById(id);
    console.log("scrolling");
    const elTop = window.scrollY + el.getBoundingClientRect().top;
    window.scrollTo({ top: elTop, behavior: "smooth"});
}

export default scrollToId;