export const registerKeyword = async (data: { keyword: string }) => {
  const response = await fetch("http://localhost:3000/api/keyword", {
    method: "POST",
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Unknown error");
  }

  return await response.json();
};
