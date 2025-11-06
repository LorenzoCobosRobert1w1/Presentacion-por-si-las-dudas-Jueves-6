document.addEventListener("DOMContentLoaded", () => {
    const btnNosotros = document.getElementById("btnNosotros");
    const btnConsultas = document.getElementById("btnConsultas");
    const seccionNosotros = document.getElementById("sobre-nosotros");
    const seccionConsultas = document.getElementById("consultas");
    const botonesEjecutar = document.querySelectorAll(".btn-ejecutar");
    const botonesEnunciado = document.querySelectorAll(".btn-enunciado");
    const themeToggle = document.getElementById("themeToggle");
    const consultas = document.querySelectorAll(".consulta");
    const btnPorque = document.getElementById("btnPorque");
    const seccionPorque = document.getElementById("porque-elegirnos");
    function highlightSQL() {
        const keywords = /\b(SELECT|INSERT|UPDATE|DELETE|FROM|WHERE|GROUP BY|HAVING|ORDER BY|JOIN|ON|AS|AND|OR|IN|BETWEEN|LIKE|IS|NULL|CREATE|VIEW|PROCEDURE|BEGIN|END|EXEC|UNION|DISTINCT|COUNT|SUM|AVG|MIN|MAX|PRINT|RETURN|IF|ELSE|CONCAT|REPLACE|YEAR|DATEADD|GETDATE)\b/gi;
        const types = /\b(VARCHAR|INT|DECIMAL|DATE|DATETIME|OUTPUT)\b/gi;
        const strings = /'([^']*)'/g;
        const numbers = /\b\d+\b/g;
        const variables = /@\w+\b/g;
        const functions = /\b(STR|YEAR|COUNT|SUM|AVG|DATEADD|GETDATE|CONCAT|REPLACE|DISTINCT)\b/gi;

        document.querySelectorAll('.consulta pre').forEach(pre => {
            let html = pre.textContent;
            html = html.replace(keywords, match => `<span class="keyword">${match}</span>`);
            html = html.replace(types, match => `<span class="type">${match}</span>`);
            html = html.replace(strings, match => `<span class="string">${match}</span>`);
            html = html.replace(numbers, match => `<span class="number">${match}</span>`);
            html = html.replace(variables, match => `<span class="variable">${match}</span>`);
            html = html.replace(functions, match => `<span class="function">${match}</span>`);
            pre.innerHTML = html;
        });
    }

   // LISTENERS ACTUALIZADOS
    btnNosotros.addEventListener("click", () => {
        seccionNosotros.classList.remove("hidden");
        seccionConsultas.classList.add("hidden");
        seccionPorque.classList.add("hidden"); // AÑADIDO
    });

    btnConsultas.addEventListener("click", () => {
        seccionNosotros.classList.add("hidden");
        seccionConsultas.classList.remove("hidden");
        seccionPorque.classList.add("hidden"); // AÑADIDO
        window.scrollTo({ top: 0, behavior: "smooth" });
    });

    // NUEVO LISTENER
    btnPorque.addEventListener("click", () => {
        seccionNosotros.classList.add("hidden");
        seccionConsultas.classList.add("hidden");
        seccionPorque.classList.remove("hidden"); // AÑADIDO
        window.scrollTo({ top: 0, behavior: "smooth" });
    });

    botonesEnunciado.forEach(boton => {
        boton.addEventListener("click", () => {
            const enunciado = boton.nextElementSibling;
            enunciado.classList.toggle("hidden");
            boton.textContent = enunciado.classList.contains("hidden")
                ? "Mostrar Enunciado"
                : "Ocultar Enunciado";
        });
    });

    botonesEjecutar.forEach(boton => {
        boton.addEventListener("click", () => {
            const imgSrc = boton.getAttribute("data-img");
            const resultado = boton.nextElementSibling;
            resultado.innerHTML = `<img src="${imgSrc}" alt="Resultado de la consulta">`;
            setTimeout(() => {
                const img = resultado.querySelector('img');
                if (img) img.classList.add('visible');
            }, 50);
        });
    });


    themeToggle.addEventListener("click", () => {
        
        consultas.forEach(consulta => {
            consulta.classList.toggle('light-theme');
          
            highlightSQL();
        });
     
        const icon = themeToggle.querySelector('i');
        if (icon.classList.contains('bi-moon-fill')) {
            icon.classList.replace('bi-moon-fill', 'bi-sun-fill');
        } else {
            icon.classList.replace('bi-sun-fill', 'bi-moon-fill');
        }
    });

    
    highlightSQL();
});

