function toggleOpen(button) {
  const referenceSection = button.closest('.reference_section');
  const list = referenceSection.querySelector('.reference_list');
  list.classList.toggle('open');
}