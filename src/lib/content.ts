/** A labelled link; rendered by LinkButton, which infers the icon from the URL unless given */
export interface Link {
  name: string;
  url: string;
  /** Font Awesome name, e.g. "brands/github" */
  icon?: string;
}
