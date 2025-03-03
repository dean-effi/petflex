export default function getDateInputString(birthDate: string) {
  const currentDate = new Date(birthDate);
  const formatted = currentDate.toISOString().split("T")[0];
  return formatted;
}
