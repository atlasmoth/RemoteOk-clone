const jobs = document.querySelectorAll(".jobs .job");

jobs.forEach((job) => {
  job.nextElementSibling.innerHTML = job.nextElementSibling.innerText;
  job.addEventListener("mousedown", handleClick.bind(null, job));
});

function handleClick(job) {
  job.nextElementSibling.classList.toggle("toggle");
}
