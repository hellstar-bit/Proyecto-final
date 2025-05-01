const books = [
    { title: "Cien años de soledad", category: "novela", image: "/images/100years.jpeg", synopsis: "Esta obra maestra narra la historia de la familia Buendía a lo largo de siete generaciones en el pueblo ficticio de Macondo.", free: false },
    { title: "El principito", category: "infantil", image: "/images/prince.jpg", synopsis: "Este clásico de la literatura cuenta la historia de un piloto que, tras un accidente en el desierto, conoce a un pequeño príncipe proveniente de otro planeta.", free: true },
    { title: "1984", category: "ficcion", image: "/images/1984.jpeg", synopsis: "Ambientada en una sociedad distópica, la novela sigue la vida de Winston Smith, un hombre que trabaja para el Partido controlando la información.", free: true },
    { title: "Don Quijote de la Mancha", category: "clasico", image: "/images/DonQ.jpeg", synopsis: "La historia del caballero Don Quijote y su fiel escudero Sancho Panza en su lucha contra molinos de viento y aventuras desquiciadas.", free: true },
    { title: "Harry Potter y la piedra filosofal", category: "fantasia", image: "/images/hp.jpeg", synopsis: "Harry Potter descubre que es un mago y comienza su aventura en Hogwarts, donde se enfrenta a la amenaza de Lord Voldemort.", free: false },
    { title: "El hobbit", category: "aventura", image: "/images/hobbit.jpeg", synopsis: "Bilbo Bolsón emprende un viaje inesperado con un grupo de enanos para recuperar su tesoro de las garras del dragón Smaug.", free: false },
    { title: "Los juegos del hambre", category: "ciencia-ficcion", image: "/images/jh.jpeg", synopsis: "En un futuro distópico, Katniss Everdeen se convierte en símbolo de la rebelión tras participar en los brutales Juegos del Hambre.", free: false },
    { title: "Orgullo y prejuicio", category: "romance", image: "/images/pride.jpeg", synopsis: "La historia de Elizabeth Bennet y el orgulloso señor Darcy en una sociedad que valora el matrimonio y la posición social.", free: false },
    { title: "Crónica de una muerte anunciada", category: "novela", image: "/images/UMA.jpg", synopsis: "La historia reconstruye el asesinato de Santiago Nasar en un pueblo donde todos sabían lo que iba a ocurrir, menos él.", free: false },
    { title: "Drácula", category: "terror", image: "/images/drac.jpeg", synopsis: "El conde Drácula viaja desde Transilvania a Inglaterra para expandir su reino de terror y enfrentarse al profesor Van Helsing.", free: false },
    { title: "El Camino Del Lobo", category: "hechos-reales", image: "/images/lobo.jpg", synopsis: "El lobo de Wall Street es la autobiografía de Jordan Belfort, un corredor de bolsa que hizo fortuna con fraudes financieros. Su vida de lujos y excesos terminó cuando el FBI lo atrapó, marcando su caída en Wall Street.", free: true },
    { title: "Hábitos Atómicos", category: "desarrollo-personal", image: "/images/habitos.jpg", synopsis: "James Clear explica cómo pequeños cambios diarios pueden generar grandes resultados, enseñando estrategias para formar buenos hábitos y eliminar los malos.", free: true },
    { title: "12 Reglas para Vivir", category: "desarrollo-personal", image: "/images/12reglas.webp", synopsis: "Jordan Peterson presenta 12 principios fundamentales para vivir con propósito y responsabilidad, abordando temas como la autodisciplina, el significado y el orden en la vida.", free: true },
    { title: "El Cuervo", category: "poesia", image: "/images/cuervo.jpg", synopsis: "Un hombre es visitado por un cuervo que repite 'Nunca más', sumiéndolo en la desesperación y la locura.", free: false }
];

document.addEventListener("DOMContentLoaded", () => {
    const bookList = document.getElementById("book-list");
    const searchInput = document.getElementById("search");
    const themeToggle = document.getElementById("theme-toggle");
    const body = document.body;
    const modal = document.createElement("div");
    const musicToggle = document.getElementById("music-toggle");
    const musicPlayer = document.getElementById("music-player");
    let isPlaying = false;

    // Aplicar el tema guardado en localStorage
    if (localStorage.getItem("darkMode") === "enabled") {
        body.classList.add("dark-mode");
        themeToggle.textContent = "🌞";
    }

    if (themeToggle) {
        themeToggle.addEventListener("click", () => {
            body.classList.toggle("dark-mode");

            if (body.classList.contains("dark-mode")) {
                localStorage.setItem("darkMode", "enabled");
                themeToggle.textContent = "🌞";
            } else {
                localStorage.setItem("darkMode", "disabled");
                themeToggle.textContent = "🌝";
            }
        });
    }

    // Reproductor de música
    if (musicToggle && musicPlayer) {
        musicToggle.addEventListener("click", () => {
            if (isPlaying) {
                musicPlayer.pause();
            } else {
                musicPlayer.play();
            }
            isPlaying = !isPlaying;
        });
    }

    // Filtrar por categoría
    if (bookList) {
        document.querySelectorAll(".nav-bar a").forEach((button) => {
            button.addEventListener("click", (event) => {
                event.preventDefault();
                const category = event.target.getAttribute("category").toLowerCase();

                document.querySelectorAll(".book-card").forEach((book) => {
                    const bookCategory = book.getAttribute("data-genre").toLowerCase();
                    if (category === "all" || bookCategory === category) {
                        book.style.display = "block";
                    } else {
                        book.style.display = "none";
                    }
                });
            });
        });
    }

    // Búsqueda de libros
    if (searchInput) {
        searchInput.addEventListener("input", () => {
            const searchTerm = searchInput.value.toLowerCase();
            document.querySelectorAll(".book-card").forEach((book) => {
                const title = book.querySelector(".book-title").textContent.toLowerCase();
                if (title.includes(searchTerm)) {
                    book.style.display = "block";
                } else {
                    book.style.display = "none";
                }
            });
        });
    }

    // Renderizar los libros
    function renderBooks() {
        if (!bookList) return;
        bookList.innerHTML = "";
        books.forEach((book, index) => {
            const div = document.createElement("div");
            div.classList.add("book-card");
            div.setAttribute("data-genre", book.category.toLowerCase());
            div.style.animation = `fadeIn 0.3s ease-in-out ${index * 0.1}s both`;
            div.innerHTML = `
                <img src="${book.image}" alt="${book.title}" class="book-image"/>
                <h2 class="book-title">${book.title}</h2>
                <p class="book-category">${book.category}</p>
            `;
            div.addEventListener("click", (event) => {
                event.stopPropagation();
                openModal(book);
            });
            bookList.appendChild(div);
        });
    }

    // Modal de detalles del libro
    function openModal(book) {
        modal.innerHTML = `
            <div class="modal-content">
                <button class="modal-close">&times;</button>
                <img src="${book.image}" alt="${book.title}" class="modal-image"/>
                <div class="modal-text">
                    <h2>${book.title}</h2>
                    <p>${book.synopsis}</p>
                    <button class="modal-button">${book.free ? "Leer" : "Comprar"}</button>
                </div>
            </div>
        `;

        modal.classList.add("floating-modal");
        document.body.appendChild(modal);
        modal.style.display = "flex";

        document.querySelector(".modal-button").addEventListener("click", (e) => {
            e.stopPropagation();
            if (book.free) {
                window.open(`/libros/${book.title.replace(/\s+/g, "_").toLowerCase()}.pdf`, "_blank");
            } else {
                alert("Por favor, inicia sesión para comprar el libro.");
            }
        });

        document.querySelector(".modal-close").addEventListener("click", () => {
            modal.style.display = "none";
        });
    }

    // Cerrar modal al hacer clic fuera
    document.addEventListener("click", () => {
        modal.style.display = "none";
    });

    // Renderizar los libros al cargar la página
    renderBooks();

    // Manejar el formulario de registro
    const registerForm = document.getElementById("register-form");
    if (registerForm) {
        registerForm.addEventListener("submit", async (e) => {
            e.preventDefault();

            const name = document.getElementById("name").value;
            const email = document.getElementById("email").value;
            const password = document.getElementById("password").value;

            try {
                const response = await fetch("http://localhost:3000/api/register", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ name, email, password }),
                });

                if (response.ok) {
                    alert("Usuario registrado exitosamente");
                    window.location.href = "/";
                } else {
                    const error = await response.text();
                    alert(`Error: ${error}`);
                }
            } catch (error) {
                console.error("Error:", error);
                alert("Hubo un problema al registrar el usuario. Inténtalo de nuevo más tarde.");
            }
        });

    }
});

document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById("login-form");
    if (loginForm) {
        loginForm.addEventListener("submit", async (e) => {
            e.preventDefault();

            const email = document.getElementById("email").value;
            const password = document.getElementById("password").value;

            try {
                const response = await fetch("http://localhost:3000/api/login", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ email, password }),
                });

                if (response.ok) {
                    // Guardar el estado de autenticación en localStorage
                    localStorage.setItem("isAuthenticated", "true");
                    alert("Inicio de sesión exitoso");
                    window.location.href = "/"; // Redirige a la página principal
                } else {
                    const error = await response.text();
                    alert(`Error: ${error}`);
                }
            } catch (error) {
                console.error("Error:", error);
                alert("Hubo un problema al iniciar sesión. Inténtalo de nuevo más tarde.");
            }
        });
    }
});

document.addEventListener("DOMContentLoaded", () => {
    const dashboardButton = document.getElementById("dashboard-button");

    // Verificar si el usuario está autenticado
    if (localStorage.getItem("isAuthenticated") === "true") {
        dashboardButton.style.display = "inline-block"; // Mostrar el botón
    }
});

document.addEventListener("DOMContentLoaded", () => {
    const logoutButton = document.getElementById("logout-button");

    // Solo proceder si el botón existe
    if (logoutButton) {
        // Verificar si el usuario está autenticado
        if (localStorage.getItem("isAuthenticated") === "true") {
            logoutButton.style.display = "inline-block"; // Mostrar el botón de cerrar sesión
        }

        // Manejar el cierre de sesión
        logoutButton.addEventListener("click", () => {
            localStorage.removeItem("isAuthenticated"); // Eliminar el estado de autenticación
            alert("Has cerrado sesión");
            window.location.href = "/"; // Redirigir a la página principal
        });
    }
});

document.addEventListener("DOMContentLoaded", () => {
    const bookTableBody = document.getElementById("book-table-body");
    const addBookForm = document.getElementById("add-book-form");

    // Verificar si estamos en la página del dashboard
    if (addBookForm) {
        // Obtener todos los libros
        async function fetchBooks() {
            try {
                const response = await fetch("http://localhost:3000/api/libros");
                const books = await response.json();

                bookTableBody.innerHTML = "";
                books.forEach(book => {
                    const row = document.createElement("tr");
                    row.setAttribute("data-id", book.id);
                    row.innerHTML = `
                        <td>${book.id}</td>
                        <td class="book-title">${book.titulo}</td>
                        <td class="book-category">${book.categoria}</td>
                        <td class="book-author">${book.autor}</td>
                        <td class="book-synopsis">${book.sinopsis}</td>
                        <td class="book-quantity">${book.cantidad}</td>
                        <td>
                            <button class="btn btn-warning btn-sm edit-btn" data-id="${book.id}">Editar</button>
                            <button class="btn btn-danger btn-sm delete-btn" data-id="${book.id}">Eliminar</button>
                        </td>
                    `;
                    bookTableBody.appendChild(row);
                });
                
                // Agregar eventos a los botones de editar
                document.querySelectorAll(".edit-btn").forEach(button => {
                    button.addEventListener("click", (e) => {
                        const id = e.target.getAttribute("data-id");
                        editBook(id);
                    });
                });
                
                // Agregar eventos a los botones de eliminar
                document.querySelectorAll(".delete-btn").forEach(button => {
                    button.addEventListener("click", (e) => {
                        const id = e.target.getAttribute("data-id");
                        deleteBook(id);
                    });
                });
            } catch (error) {
                console.error("Error al obtener los libros:", error);
            }
        }

        // Agregar un nuevo libro
        addBookForm.addEventListener("submit", async (e) => {
            e.preventDefault();
        
            const titulo = document.getElementById("book-title").value;
            const categoria = document.getElementById("book-category").value;
            const autor = document.getElementById("book-author").value;
            const sinopsis = document.getElementById("book-synopsis").value;
            const cantidad = document.getElementById("book-quantity").value;
        
            try {
                await fetch("http://localhost:3000/api/libros", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ titulo, categoria, autor, sinopsis, cantidad }),
                });
                fetchBooks(); // Actualizar la tabla
                addBookForm.reset(); // Limpiar el formulario
            } catch (error) {
                console.error("Error al agregar el libro:", error);
            }
        });

        // Eliminar un libro
        async function deleteBook(id) {
            try {
                const response = await fetch(`http://localhost:3000/api/libros/${id}`, {
                    method: "DELETE",
                });
        
                if (response.ok) {
                    alert("Libro eliminado exitosamente");
                    fetchBooks(); // Actualizar la tabla
                } else {
                    alert("Error al eliminar el libro");
                }
            } catch (error) {
                console.error("Error al eliminar el libro:", error);
            }
        }
        
        // Editar un libro
        async function editBook(id) {
            const bookRow = document.querySelector(`tr[data-id="${id}"]`);
            const titulo = bookRow.querySelector(".book-title").textContent;
            const categoria = bookRow.querySelector(".book-category").textContent;
            const autor = bookRow.querySelector(".book-author").textContent;
            const sinopsis = bookRow.querySelector(".book-synopsis").textContent;
            const cantidad = bookRow.querySelector(".book-quantity").textContent;
        
            // Mostrar un formulario prellenado
            const editFormHtml = `
                <form id="edit-book-form">
                    <div>
                        <label>Título:</label>
                        <input type="text" id="edit-title" value="${titulo}" required>
                    </div>
                    <div>
                        <label>Categoría:</label>
                        <input type="text" id="edit-category" value="${categoria}" required>
                    </div>
                    <div>
                        <label>Autor:</label>
                        <input type="text" id="edit-author" value="${autor}" required>
                    </div>
                    <div>
                        <label>Sinopsis:</label>
                        <textarea id="edit-synopsis" required>${sinopsis}</textarea>
                    </div>
                    <div>
                        <label>Cantidad:</label>
                        <input type="number" id="edit-quantity" value="${cantidad}" required>
                    </div>
                    <button type="submit">Guardar Cambios</button>
                </form>
            `;
        
            document.body.insertAdjacentHTML("beforeend", editFormHtml);
        
            const editForm = document.getElementById("edit-book-form");
            editForm.addEventListener("submit", async (e) => {
                e.preventDefault();
        
                const updatedBook = {
                    titulo: document.getElementById("edit-title").value,
                    categoria: document.getElementById("edit-category").value,
                    autor: document.getElementById("edit-author").value,
                    sinopsis: document.getElementById("edit-synopsis").value,
                    cantidad: document.getElementById("edit-quantity").value,
                };
        
                try {
                    const response = await fetch(`http://localhost:3000/api/libros/${id}`, {
                        method: "PUT",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(updatedBook),
                    });
        
                    if (response.ok) {
                        alert("Libro actualizado exitosamente");
                        fetchBooks(); // Actualizar la tabla
                        editForm.remove(); // Eliminar el formulario de edición
                    } else {
                        alert("Error al actualizar el libro");
                    }
                } catch (error) {
                    console.error("Error al actualizar el libro:", error);
                }
            });
        }

        // Inicializar la tabla
        fetchBooks();
    }
});