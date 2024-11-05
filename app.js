console.log('Hello World!');

let skillsArray = [
    
    { id: 2, name: 'Java', category: 'Programming Languages' },
    { id: 3, name: 'Python', category: 'Programming Languages' },
    { id: 4, name: 'HTML', category: 'Technologies' },
    { id: 5, name: 'CSS', category: 'Technologies' },
    { id: 6, name: 'JavaScript', category: 'Technologies' },
    
];

let nextSkillId = skillsArray.length + 1;
let editingSkillId = null;

const navItems = [
    { id: 'summary', text: 'Summary' },
    { id: 'skills', text: 'Skills' },
    { id: 'projects', text: 'Projects' },
    { id: 'education', text: 'Education' },
    { id: 'contact', text: 'Contact' }
];

const name = "Mohit GOKAr";
let hasDownloadedResume = false;
let downloadCount = 0;

$(document).ready(function() {
  
    function showGreeting() {
        let currentHour = new Date().getHours();
        let greeting = "";

        if (currentHour >= 5 && currentHour < 12) {
            greeting = "Good Morning";
        } else if (currentHour >= 12 && currentHour < 18) {
            greeting = "Good Afternoon";
        } else {
            greeting = "Good Evening";
        }

        return greeting + ", my name is " + name + "! Welcome to my portfolio!";
    }

    $("#greeting").html(showGreeting());

    function renderNavigation() {
        const navList = $('<ul>').addClass('navbar-nav me-auto mb-2 mb-lg-0');
        
        navItems.forEach(item => {
            const li = $('<li>').addClass('nav-item');
            const link = $('<a>')
                .addClass('nav-link')
                .attr('href', `#${item.id}`)
                .text(item.text)
                .click(function(e) {
                    e.preventDefault();
                    $('html, body').animate({
                        scrollTop: $(`#${item.id}`).offset().top - 70
                    }, 800);
                });
            li.append(link);
            navList.append(li);
        });

        const downloadBtn = $('<li>').addClass('nav-item');
        const downloadLink = $('<a>')
            .addClass('btn btn-primary ms-lg-3 resume-btn')
            .attr({
                'href': 'https://drive.google.com/file/d/12Kp42UZLQ_XR-ckg99_5ejWZaRRUMlht/view?usp=drive_link',
                'target': '_blank'
            })
            .text('Download Resume');
        
        downloadLink.click(function() {
            if (!hasDownloadedResume) {
                setTimeout(function() {
                    alert("Your resume downloaded successfully!");
                    downloadCount++;
                    $("#download-count").text(downloadCount);
                }, 2000);
                hasDownloadedResume = true;
            }
        });
        
        downloadBtn.append(downloadLink);
        navList.append(downloadBtn);
        
        
        const downloadCounter = $('<li>').addClass('nav-item ms-3');
        const counterSpan = $('<span>')
            .addClass('text-white')
            .html('DOWNLOADS: <span id="download-count">0</span>');
        downloadCounter.append(counterSpan);
        navList.append(downloadCounter);

        $('#navbarNav').html(navList);
    }

    
    function renderSkills() {
        const skillsList = $('.skills-list').empty();

        skillsArray.forEach(skill => {
            const skillItem = createSkillElement(skill);
            skillsList.append(skillItem);
        });
    }

    function createSkillElement(skill) {
        const li = $('<div>')
            .addClass('skill-item p-3 border rounded d-flex justify-content-between align-items-center mb-2')
            .attr('data-id', skill.id);
        
        const skillText = $('<span>').text(skill.name);
        
        const buttonsDiv = $('<div>');

        const editBtn = $('<button>')
            .addClass('btn btn-sm btn-warning me-2')
            .text('Edit')
            .click(() => startEditingSkill(skill.id));

        const deleteBtn = $('<button>')
            .addClass('btn btn-sm btn-danger')
            .text('Delete')
            .click(() => removeSkill(skill.id));
        
        buttonsDiv.append(editBtn, deleteBtn);
        li.append(skillText, buttonsDiv);
        
        return li;
    }

    function addSkill(name) {
        if (!name.trim()) return false;

        const newSkill = {
            id: nextSkillId++,
            name: name
        };

        skillsArray.push(newSkill);
        renderSkills();
        return true;
    }

    function removeSkill(id) {
        const index = skillsArray.findIndex(skill => skill.id === id);
        if (index !== -1) {
            skillsArray.splice(index, 1);
            renderSkills();
        }
    }

    function startEditingSkill(id) {
        const skill = skillsArray.find(s => s.id === id);
        if (skill) {
            editingSkillId = id;
            $('#skill-input').val(skill.name);
        }
    }

    function updateSkill(id, newName) {
        const skill = skillsArray.find(s => s.id === id);
        if (skill) {
            skill.name = newName;
            renderSkills();
        }
    }

    $('#skill-form').submit(function(e) {
        e.preventDefault();
        const skillName = $('#skill-input').val().trim();

        if (editingSkillId !== null) {
            updateSkill(editingSkillId, skillName);
            editingSkillId = null;
        } else {
            addSkill(skillName);
        }

        $('#skill-input').val('');
    });

    const projects = [
        {
            title: "Truck1",
            description: "3D truck model with Maya software.",
            images: ["mgimg.jpg.png"],
            deadline: new Date('2023-10-30')
        },
        {
            title: "Truck2",
            description: "Another picture of the truck.",
            images: ["mgimge.jpg.png"],
            deadline: new Date('2023-11-15')
        }
    ];

    function renderProjects() {
        const projectsList = $('#projects').empty();

        projects.forEach(project => {
            const projectCard = $('<div>').addClass('card mb-3');
            projectCard.html(`
                <img src="${project.images[0]}" class="card-img-top" alt="${project.title}">
                <div class="card-body">
                    <h5 class="card-title">${project.title}</h5>
                    <p class="card-text">${project.description}</p>
                    <p class="card-text"><strong>Deadline:</strong> ${project.deadline.toLocaleDateString()}</p>
                </div>
            `);
            projectsList.append(projectCard);
        });
    }

    $('#sort-projects').click(function() {
        const isAscending = $(this).data('ascending');
        projects.sort((a, b) => {
            return isAscending ? 
                a.deadline - b.deadline : 
                b.deadline - a.deadline;
        });
        $(this).data('ascending', !isAscending);
        $(this).text(`Sort by Deadline (${isAscending ? 'Latest First' : 'Earliest First'})`);
        renderProjects();
    });

    renderNavigation();
    renderSkills();
    renderProjects();
});
