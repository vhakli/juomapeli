export interface Task {
  title: string;
  description?: string;
}

/**
 * List of all tasks available in the game.
 * New tasks can be added here with a pull request, or if
 * you choose to self-host, you are free to add them here.
 */

export const tasks: Task[] = [
  { title: "Vanhin juo 1" },
  { title: "Nuorin juo 1" },
  { title: "Keksi sääntö" },
  { title: "Pelaaja *random-any* jakaa 3 huikkaa" },
  {
    title: "Peukkusota vs *random-other*",
    description: "Peukkusodan häviäjä juo 3.",
  },
  {
    title: "Kivi paperi sakset vs *random-other*",
    description: "Kivi paperisaksen häviäjä juo 3.",
  },
  {
    title: "Totuus tai tehtävä",
    description: "Jos et suostu, muut keksivät rangaistuksen.",
  },
  { title: "Kaikki kissan-/koiranomistajat juo" },
  { title: "Kaikki juo 10 sekuntia" },
  {
    title: "Vähiten humalassa oleva juo 3",
    description: "Jos kaikki yhtä vähän humalassa, kaikki juo.",
  },
  { title: "2 totuutta, 1 vale" },
  { title: "Never have I ever" },
];
