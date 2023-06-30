// Importe a função que será testada
import { validateWebURL } from "../src/client";

// Crie um mock para o objeto pixabayResponse
const pixabayResponse = {
  hits: [
    { webformatURL: 'https://example.com/image1.jpg' },
    { webformatURL: 'https://example.com/image2.jpg' },
    { webformatURL: undefined },
  ],
};

describe('validateWebURL', () => {
  it('retorna um índice válido', () => {
    const numberOfImg = pixabayResponse.hits.length;
    const randomImgIndex = validateWebURL(pixabayResponse, numberOfImg);

    expect(randomImgIndex).toBeGreaterThanOrEqual(0);
    expect(randomImgIndex).toBeLessThan(numberOfImg);
  });
});