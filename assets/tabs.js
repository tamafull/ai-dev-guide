document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('[data-tabs]').forEach((group, groupIndex) => {
    const buttons = [...group.querySelectorAll('[role="tab"]')];
    const panels = [...group.querySelectorAll('[role="tabpanel"]')];
    if (!buttons.length || !panels.length) return;

    const activate = (button, focus = false) => {
      const target = button.getAttribute('aria-controls');
      buttons.forEach((b) => {
        const selected = b === button;
        b.setAttribute('aria-selected', selected ? 'true' : 'false');
        b.tabIndex = selected ? 0 : -1;
      });
      panels.forEach((panel) => {
        panel.hidden = panel.id !== target;
      });
      if (focus) button.focus();
    };

    buttons.forEach((button, index) => {
      if (!button.id) button.id = `lang-tab-${groupIndex}-${index}`;
      button.addEventListener('click', () => activate(button));
      button.addEventListener('keydown', (event) => {
        if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
        event.preventDefault();
        let next = index;
        if (event.key === 'ArrowLeft') next = (index - 1 + buttons.length) % buttons.length;
        if (event.key === 'ArrowRight') next = (index + 1) % buttons.length;
        if (event.key === 'Home') next = 0;
        if (event.key === 'End') next = buttons.length - 1;
        activate(buttons[next], true);
      });
    });

    const initial = buttons.find((b) => b.getAttribute('aria-selected') === 'true') || buttons[0];
    activate(initial);
  });
});
