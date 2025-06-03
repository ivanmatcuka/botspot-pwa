'use server';

const customFormsUrl = `${process.env.NEXT_PUBLIC_WORDPRESS_URL}/botspot/v1/forms`;

export const getForm = async (formId?: number): Promise<any | null> => {
  try {
    const response = await fetch(`${customFormsUrl}/${formId}`, {
      method: 'GET',
    });

    if (!response.ok) {
      throw new Error('Failed to submit form');
    }

    return await response.json();
  } catch (error) {
    return null;
  }
};
