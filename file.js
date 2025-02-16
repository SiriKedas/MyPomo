document.addEventListener("DOMContentLoaded", function () {
    const folderNameInput = document.getElementById("folder-name");
    const foldersContainer = document.getElementById("folders-container");
    const createFolderBtn = document.querySelector("button");

    loadFolders(); 

    createFolderBtn.addEventListener("click", function () {
        const folderName = folderNameInput.value.trim();
        if (folderName !== "") {
            createFolder(folderName);
            folderNameInput.value = ""; 
            saveFolders();
        } else {
            alert("Please enter a folder name!");
        }
    });

    function createFolder(folderName, links = [], bgColor = "") {
        const folder = document.createElement("div");
        folder.classList.add("folder");
        if (bgColor) folder.style.background = bgColor;

        folder.innerHTML = `
            <div class="folder-title">
                <span>${folderName}</span>
                <button class="delete-folder">❌</button>
            </div>
            <div class="folder-content">
                <input type="text" class="link-input" placeholder="Enter link">
                <button class="add-link">➕ Add Link</button>
                <ul class="links"></ul>
                <button class="change-bg">🎨 Change Background</button>
            </div>
        `;

        foldersContainer.appendChild(folder);
        const linkList = folder.querySelector(".links");
        links.forEach(link => addLink(folder, link));

        folder.querySelector(".folder-title").addEventListener("click", () => {
            toggleFolder(folder);
        });

        folder.querySelector(".add-link").addEventListener("click", () => {
            addLink(folder);
        });

        folder.querySelector(".delete-folder").addEventListener("click", () => {
            deleteFolder(folder);
        });

        folder.querySelector(".change-bg").addEventListener("click", () => {
            changeFolderBackground(folder);
        });
    }

    function changeFolderBackground(folder) {
        const newColor = prompt("Enter a background color (name or hex code):");
        if (newColor) {
            folder.style.background = newColor;
            saveFolders();
        }
    }

    function toggleFolder(folder) {
        const content = folder.querySelector(".folder-content");
        content.style.display = content.style.display === "block" ? "none" : "block";
    }

    function addLink(folder, linkValue = "") {
        const linkInput = folder.querySelector(".link-input");
        if (!linkValue) {
            linkValue = linkInput.value.trim();
        }
        if (linkValue !== "") {
            const linkList = folder.querySelector(".links");
            const listItem = document.createElement("li");
            listItem.innerHTML = `
                <a href="${linkValue}" target="_blank">${linkValue}</a>
                <button class="delete-link">❌</button>
            `;
            listItem.querySelector(".delete-link").addEventListener("click", function () {
                listItem.remove();
                saveFolders();
            });
            linkList.appendChild(listItem);
            linkInput.value = "";
            saveFolders();
        }
    }

    function deleteFolder(folder) {
        folder.remove();
        saveFolders();
    }

    function saveFolders() {
        const folders = [];
        document.querySelectorAll(".folder").forEach(folder => {
            const folderName = folder.querySelector(".folder-title span").textContent;
            const bgColor = folder.style.background;
            const links = [];
            folder.querySelectorAll(".links li a").forEach(link => links.push(link.href));
            folders.push({ name: folderName, links: links, bgColor: bgColor });
        });

        localStorage.setItem("folders", JSON.stringify(folders));
    }

    function loadFolders() {
        const savedFolders = JSON.parse(localStorage.getItem("folders")) || [];
        savedFolders.forEach(folderData => {
            createFolder(folderData.name, folderData.links, folderData.bgColor);
        });
    }
});




