export const registerKeyword = async (data: { keyword: string }) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/keyword`,
    {
      method: "POST",
      body: JSON.stringify(data),
    }
  );

  if (!response.ok) {
    throw new Error("Unknown error");
  }

  return await response.json();
};
