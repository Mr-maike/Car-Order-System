import axios from 'axios';

const FIPE_BASE_URL = 'https://parallelum.com.br/fipe/api/v1';

export class FipeClient {
  private async fetchWithTimeout(url: string, timeout = 5000) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);
    
    try {
      const response = await axios.get(url, {
        signal: controller.signal,
      });
      clearTimeout(timeoutId);
      return response.data;
    } catch (error) {
      clearTimeout(timeoutId);
      throw new Error('Falha na comunicação com a API FIPE');
    }
  }

  async getBrands() {
    return this.fetchWithTimeout(`${FIPE_BASE_URL}/carros/marcas`);
  }

  async getModels(brandId: string) {
    return this.fetchWithTimeout(`${FIPE_BASE_URL}/carros/marcas/${brandId}/modelos`);
  }

  async getYears(brandId: string, modelId: string) {
    return this.fetchWithTimeout(
      `${FIPE_BASE_URL}/carros/marcas/${brandId}/modelos/${modelId}/anos`
    );
  }

  async getVehicleDetails(brandId: string, modelId: string, yearId: string) {
    return this.fetchWithTimeout(
      `${FIPE_BASE_URL}/carros/marcas/${brandId}/modelos/${modelId}/anos/${yearId}`
    );
  }
}

export const fipeClient = new FipeClient();