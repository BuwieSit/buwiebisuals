window.onload = () => {
    const navbar = document.querySelector(".nav-bar");
    const scrollWatcher = document.createElement("div");
    const body = document.body;
    const navLinks = document.querySelectorAll(".nav-bar a");
    const sections = document.querySelectorAll(".section"); 
    const contactSect= document.querySelectorAll(".contact-section");

    if (sections.length === 0) {
        console.error("No sections found on the page.");
        return;
    }

    body.style.overflow = "hidden";

        
        sections.forEach(section => {
            section.classList.add("blurred");
            console.log(`Added 'blurred' class to section:`, section);
        });

    scrollWatcher.setAttribute("data-scroll-watcher", "");

    navbar.before(scrollWatcher);
    let lastState = true; 

    const handleScrollBehavior = (isIntersecting) => {
        navbar.classList.toggle("sticking", !isIntersecting);
        
        // If we are very close to the top (based on the intersection observer)
        if (isIntersecting && !lastState) {
 
            body.style.overflow = "hidden";
            window.scrollTo(0, 0);
            navbar.style.backgroundImage = "linear-gradient(#FFB22C, #F7F7F7)";
        } else if (!isIntersecting && lastState) {
            body.style.overflow = "auto";
            navbar.style.backgroundImage = "none";
        }

        // Update last state for the next scroll event
        lastState = isIntersecting;
    };

    // OBSERVER
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


    // BLUR EFFECTS
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.remove("blurred"); 
                

            } else {
                entry.target.classList.add("blurred"); 

            }
        });
    }, { threshold: 0.4 }); 

    sections.forEach(section => sectionObserver.observe(section));

    // const contactObserver = new IntersectionObserver((entries) => {
    //     entries.forEach(contactSect => {
    //         if (contactSect.isIntersecting) {
    //             contactSect.classList.add("fade-bg");
    //             console.log(contactSect.classList);
    //         }   
    //         else {
    //             contactSect.classList.remove("fade-bg");
    //             console.log(contactSect.classList);
    //         }
    //     })
    // }, { threshold: 0.4 });

    // contactSect.forEach(contactSect => contactObserver.observe(contactSect));

};