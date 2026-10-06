export interface Stat {
  value: number;
  suffix: string;
  label: string;
  note: string;
}

export const stats: Stat[] = [
  { value: 5, suffix: "+", label: "Years Experience", note: "Shipping since 2021" },
  { value: 40, suffix: "+", label: "Projects Delivered", note: "Sites, tools & platforms" },
  { value: 25, suffix: "+", label: "Happy Clients", note: "India & worldwide" },
  { value: 100, suffix: "%", label: "Source Code Ownership", note: "It's yours, forever" },
];
