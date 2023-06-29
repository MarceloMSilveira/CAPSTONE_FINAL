function validateWebURL (pixabayResponse,numberOfImg){
    try {
        const randomImgIndex = Math.floor(Math.random() * numberOfImg);
        console.log(`${numberOfImg} hits found, ${randomImgIndex} chosen!`);
    
        if (pixabayResponse.hits[randomImgIndex].webformatURL === undefined) {
          throw new Error('Variável indefinida');
        }
    
        return randomImgIndex;
      } catch (error) {
        // Trate a exceção aqui, por exemplo, exiba uma mensagem de erro ou execute alguma ação alternativa
        console.log('Ocorreu um erro:', error.message);
        // Você pode chamar a função novamente para tentar encontrar um valor válido
        return validateWebURL(pixabayResponse, numberOfImg);
      }
}

export{validateWebURL}