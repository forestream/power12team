const BASE_URL = "https://rolling-api.vercel.app";

export const getMessages = async ({ id, limit, offset }) => {
  const RESPONSE = await fetch(
    `${BASE_URL}/4-12/recipients/${id}/messages/?limit=${limit}&offset=${offset}`,
  );

  if (!RESPONSE.ok) {
    throw new Error("메세지 목록을 받아오는데 실패했어요.");
  }

  const MESSAGES = await RESPONSE.json();

  return MESSAGES;
};

export const deleteMessage = async (id) => {
  const RESPONSE = await fetch(`${BASE_URL}/4-12/messages/${id}/`, {
    method: "DELETE",
  });

  if (!RESPONSE.ok) {
    throw new Error("메세지가 존재하지 않거나 지워지지 않았어요.");
  }

  const RESULT = await RESPONSE.json();
  console.log(RESULT);

  return RESULT;
};
