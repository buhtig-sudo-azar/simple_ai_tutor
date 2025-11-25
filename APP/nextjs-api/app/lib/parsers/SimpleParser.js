import ParserInterface from './ParserInterface';

/**
 * Простой парсер для статических HTML сайтов
 * @class SimpleParser
 * @extends ParserInterface
 * @example
 * const parser = new SimpleParser();
 * const data = await parser.parse('https://example.com');
 * console.log(data.html);
 */
class SimpleParser extends ParserInterface {
  /**
   * Определяет может ли парсер работать с сайтом?
   * @param {string} url - URL для проверки
   * @returns {boolean} - значение true если адреса подходят
   */
  canHandle(url) {
    const lowerUrl = url.toLowerCase();
    const allowedDomains = ["example.com", "wikipedia.org"];
    return allowedDomains.some((domain) => lowerUrl.includes(domain));
  }

  /**
   * Выполняет HTTP запрос и возвращает HTML и статус
   * @param {string} url - URL для парсинга
   * @returns {Promise<Object>} - Результат парсинга
   * @throws {Error} - При сетевых ошибках, неверном URL или недоступности сайта
   * @example
   * const parser = new SimpleParser();
   * try {
   *   const result = await parser.parse('https://example.com');
   *   console.log(result.html); // HTML страницы
   * } catch (error) {
   *   console.error(error.message);
   * }
   */
  async parse(url) {
    const response = await axios.get(url);
    try {
      const html = response.data;
      return {
        html: html,
        success: true
      };
    } catch (error) {
      throw new Error(`Не удалось распарсить URL: ${url}. Причина: ${error.message}`);
    }
  }

  /**
   * реализация класса SimpleParser  
   * @returns {Object} - Свойства объекта  
   * @example
   * const parser = new SimpleParser();
   * try {
   *   console.log(parser.getCapabilities()) ;  
   * } catch (error) {
   *   console.error(error.message);
   * }
   */
  getCapabilities() {
    return {
      type: "simple",
      speed: "fast", 
      canParse: ["wikipedia.org", "example.com", "simple-blogs"],
      cannotParse: ["javascript", "react", "vue", "dynamic-content", "spa"],
      version: "1.0.0",
      features: ["html-parsing", "link-extraction", "header-analysis"]
    };
  }
}

export default SimpleParser;
