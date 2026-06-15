export const projectImageBlurData = {
  "Turkish-Dictionary":
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAADCAYAAAC09K7GAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAPklEQVR4nAEzAMz/AL62s/8fCgb/GgAA/7uxr/8A7ezt/8LCwv++ubb/5+Xl/wD4+Pj/5uXm/+jp6f//////SxIluim5dtkAAAAASUVORK5CYII=",
  Learnification:
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAACCAYAAAB/qH1jAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAKElEQVR4nGPg4OT5HxER/n/tlr3/+6bO/c+gqKz6v6629v/0uYvBGAAaYRKKSxGBHQAAAABJRU5ErkJggg==",
  "Turkish-Dictionary-using-TDK-API":
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAACCAYAAAB/qH1jAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAKUlEQVR4nGNQUlL+f+XSlf9vXn/4r69v8J+BmZn5v7GR8X9HB8f/IDYAKB8PmxDPeTkAAAAASUVORK5CYII=",
  "Meme-Generator":
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAACCAYAAAB/qH1jAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAK0lEQVR4nGNwUxP4/+zo0v827nH/GVlE/zOkWQn9///55H+3kJz/DAwC/wETexBD+9k3IgAAAABJRU5ErkJggg==",
  "Frontend-Mentor-Challenges":
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAACCAYAAAB/qH1jAAAACXBIWXMAAA7DAAAOwwHHb6hkAAAALUlEQVR4nAEiAN3/AKKSy/8AAFb/QUlX//b7/f8A/P7//0JHVP86QEn/+P3//1gtFaro6jYOAAAAAElFTkSuQmCC",
} as const satisfies Record<Project["endpoint"], string>;

export function getProjectImageBlurData(endpoint: Project["endpoint"]) {
  const blurData =
    projectImageBlurData[endpoint as keyof typeof projectImageBlurData];

  if (!blurData) {
    throw new Error(`Missing project image blur data for "${endpoint}"`);
  }

  return blurData;
}
