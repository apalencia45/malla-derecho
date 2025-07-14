const grid = document.getElementById("grid");

const malla = {
  "1er semestre": [
    {id: "intro", nombre: "Introducción al Derecho"},
    {id: "romano", nombre: "Derecho Romano"},
    {id: "historia", nombre: "Historia del Derecho"},
    {id: "economía", nombre: "Derecho y Economía"},
    {id: "comunicación", nombre: "Comunicación y Redacción"},
    {id: "investigación", nombre: "Introducción a la investigación"},
    {id: "f1", nombre: "Forhum 1"},
    {id: "t1", nombre: "Talento 1"},
  ],
  "2do semestre": [
    {id: "teoria", nombre: "Teoría del Derecho", reqs: ["intro"]},
    {id: "estado", nombre: "Teoría del Estado", reqs: ["intro"]},
    {id: "natural", nombre: "Derecho Natural",  reqs: ["intro"]},
    {id: "penal1", nombre: "Derecho Penal 1",  reqs: ["intro"] ["historia"]},
    {id: "civil1", nombre: "Persona y Sociedad", reqs: ["intro"] ["romano"]},
    {id: "antro", nombre: "Antropología Filosófica"},
    {id: "f2", nombre: "Forhum 2", reqs:["f1"]},
    {id: "t2", nombre: "Talento 2", reqs:["t1"]},
  ],
  "3er semestre": [
    {id: "penal2", nombre: "Derecho Penal 2", reqs: ["penal1"]},
    {id: "consti1", nombre: "Derecho Constitucional I", reqs: ["estado"]},
    {id: "crimi", nombre: "Criminalistica", reqs: ["penal1"]},
    {id: "civil2", nombre: "Bienes y Derechos reales", reqs: ["civil1"]},
    {id: "tgp", nombre: "Teoría General del Proceso", reqs: ["civil1"] ["penal1"]},
    {id: "etica", nombre: "Ética", reqs: ["antro"]},
    {id: "f3", nombre: "Forhum 3", reqs: ["f2"]},
    {id: "t3", nombre: "Talento 3", reqs: ["t2"]},
  ],
  "4to semestre": [
    {id: "consti2", nombre: "Derecho Constitucional II", reqs: ["consti1"]},
    {id: "oratoria", nombre: "Oratoria Forense", reqs: ["tgp"]},
    {id: "admin", nombre: "Derecho Administrativo", reqs: ["consti1"]},
    {id: "civil3", nombre: "Derecho de Familia", reqs: ["consti1"] ["civil2"]},
    {id: "pp1", nombre: "Derecho Procesal Penal I", reqs: ["tgp"]},
    {id: "teolo1", nombre: "Persona y Trascendencia 1", reqs: ["etica"]},
    {id: "f4", nombre: "Forhum 4", reqs: ["f3"]},
    {id: "t4", nombre: "Talento 4", reqs: ["t3"]},
  ],
  "5to semestre": [
    {id: "filo", nombre: "Filosofía del Derecho", reqs: ["natural"]},
    {id: "laboral1", nombre: "Derecho Laboral I", reqs: ["consti2"]},
    {id: "civil4", nombre: "Derecho de Obligaciones", reqs: ["consti2"] ["civil3"]},
    {id: "pp2", nombre: "Derecho Procesal Penal II", reqs: ["pp1"] ["penal2"]},
    {id: "ppadm", nombre: "Derecho Procesal Administrativo", reqs: ["admin"] },
    {id: "tesis1", nombre: "Investigación Jurídica 1", reqs: ["investigación"]},
    {id: "teolo2", nombre: "Persona y Trascendencia 2", reqs: ["etica"]},
    {id: "f5", nombre: "Forhum 5", reqs: ["f4"]},
    {id: "t5", nombre: "Talento 6 ", reqs: ["t4"]},
  ],
  "6to semestre": [
    {id: "laboral2", nombre: "Derecho Laboral 2", reqs: ["laboral1"]},
    {id: "civil5", nombre: "Teoría General del Contrato", reqs: ["civil4"]},
    {id: "mercantil1", nombre: "Comerciante Individual y Empresa Mercantil", reqs: ["civil4"]},
    {id: "pp3", nombre: "Derecho Procesal Penal III", reqs: ["pp2"]},
    {id: "pcm1", nombre: "Derecho Procesal Civil y Mercantil", reqs: ["tgp"]},
    {id: "claves1", nombre: "Claves del Pensamiento 1", reqs: ["antro"]["etica"]},
    {id: "f6", nombre: "Forhum 6", reqs: ["f5"]},
    {id: "t6", nombre: "Talento 6", reqs: ["t5"]},
  ],
  
  // Agrega más semestres siguiendo el mismo formato
};

let completed = new Set();

function canBeEnabled(course) {
  if (!course.reqs) return true;
  return course.reqs.every(req => completed.has(req));
}

function toggleCourse(id, element) {
  if (element.classList.contains("locked")) return;

  if (completed.has(id)) {
    completed.delete(id);
    element.classList.remove("completed");
  } else {
    completed.add(id);
    element.classList.add("completed");
  }
  renderCourses();
}

function renderCourses() {
  grid.innerHTML = "";
  for (const [semestre, cursos] of Object.entries(malla)) {
    const box = document.createElement("div");
    box.className = "semester";
    const title = document.createElement("h2");
    title.textContent = semestre;
    box.appendChild(title);

    cursos.forEach(course => {
      const div = document.createElement("div");
      div.textContent = course.nombre;
      div.className = "course";

      if (completed.has(course.id)) {
        div.classList.add("completed");
      } else if (!canBeEnabled(course)) {
        div.classList.add("locked");
      }

      div.onclick = () => toggleCourse(course.id, div);
      box.appendChild(div);
    });

    grid.appendChild(box);
  }
}

renderCourses();