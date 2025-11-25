/**
 * Базовый интерфейс для всех парсеров в системе
 * @class
 * @abstract
 */
class ParserInterface {
  /**
   * Основной метод парсинга URL
   * @param {string} url - URL для парсинга
   * @returns {Promise<Object>} - Результат парсинга
   * @throws {Error} - Если URL недоступен или парсинг не удался
   * @example
   * const parser = new SimpleParser();
   * const data = await parser.parse('https://example.com');
   */
  async parse(url) {
    const response = await axios.get(url);  // ✅ ИСПРАВЛЕНО
    
    try {
      const html = response.data;  // ✅ ИСПРАВЛЕНО - ПРАВИЛЬНО!
      
      return {
        html: html,
        success: true
      };
    } catch (error) {
      throw new Error(`Не удалось распарсить URL: ${url}. Причина: ${error.message}`);
    }
  }

  /**
   * Проверяет возможность обработки URL
   * @param {string} url - URL для проверки
   * @returns {boolean} - true если может обработать
   */
  
  canHandle(url) {
  const lowerUrl = url.toLowerCase();
  const allowedDomains = ['example.com', 'wikipedia.org'];
  
  return allowedDomains.some(domain => {
    return lowerUrl.includes(domain); 
  });

    throw new Error("Метод canHandle() должен быть реализован!");
  }

  /**
   * Возвращает информацию о возможностях парсера
   * @returns {Object} - Объект с характеристиками
   * @property {string} type - Тип парсера
   * @property {string} speed - Скорость работы
   */
  getCapabilities() {
    throw new Error("Метод getCapabilities() должен быть реализован!");
  }
}
export default ParserInterface;
