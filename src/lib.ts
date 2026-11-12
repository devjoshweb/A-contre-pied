export const SECTIONS = [
  { slug: 'sport', name: 'Sport', intro: 'Le sport, loin des clichés et des communiqués.' },
  { slug: 'politique', name: 'Politique', intro: 'La politique, hors du bruit.' },
  { slug: 'societe', name: 'Société', intro: 'Les sujets de société, vus de travers.' },
];
export const slugOf = (name: string) => SECTIONS.find((s) => s.name === name)!.slug;
export const fmt = (d: Date) => d.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' });
