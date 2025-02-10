// window.onload = () => {
    
//     const navbar = document.querySelector(".nav-bar");
//     const scrollWatcher = document.createElement("div");

//     scrollWatcher.setAttribute("data-scroll-watcher", "")
//     navbar.before(scrollWatcher);

    

//     const navObserver = new IntersectionObserver((entries) => {
        
//         navbar.classList.toggle("sticking", !entries[0].isIntersecting, );
        


//     }, {rootMargin: "100px 0px 0px 0px"});

//     navObserver.observe(scrollWatcher);
// }



window.onload = () => {
    const navbar = document.querySelector(".nav-bar");
    const scrollWatcher = document.createElement("div");
    const body = document.body;
    const navLinks = document.querySelectorAll(".nav-bar a");

    // Initially disable scrolling
    body.style.overflow = "hidden";

    scrollWatcher.setAttribute("data-scroll-watcher", "");
    navbar.before(scrollWatcher);

    let lastState = true; // Track last intersection state to prevent flickering

    // Function to handle when we should toggle scrolling and navbar behavior
    const handleScrollBehavior = (isIntersecting) => {
        navbar.classList.toggle("sticking", !isIntersecting);
        
        // If we are very close to the top (based on the intersection observer)
        if (isIntersecting && !lastState) {
 
            body.style.overflow = "hidden";
            window.scrollTo(0, 0); // Redirect to the top immediately
        } else if (!isIntersecting && lastState) {
            body.style.overflow = "auto"; // Allow scrolling
        }

        // Update last state for the next scroll event
        lastState = isIntersecting;
    };

    // Observe intersection changes and toggle class & scrolling
    const navObserver = new IntersectionObserver((entries) => {
        const isIntersecting = entries[0].isIntersecting;
        handleScrollBehavior(isIntersecting);
    }, { rootMargin: "120px 0px 0px 0px" });  // Slightly increased rootMargin to avoid flickering

    navObserver.observe(scrollWatcher);

    
    navLinks.forEach(link => {
        link.addEventListener("click", (e) => {
            e.preventDefault();  // Prevent default behavior
            body.style.overflow = "auto";  // Allow scrolling
            document.querySelector(link.getAttribute("href")).scrollIntoView({ behavior: "smooth" });
        });
    });

    


};

