// FILE: /lib/parsers/ParserInterface.js
/**
 * КОНТРАКТ для всех парсеров в системе
 * Каждый парсер ДОЛЖЕН реализовать эти методы
 * @abstract
 */
class ParserInterface {
  async parse(url) {
    throw new Error('Метод parse() должен быть реализован!');
  }
  canHandle(url) {
    throw new Error('Метод canHandle() должен быть реализован!');
  }
  getCapabilities() {
    throw new Error('Метод getCapabilities() должен быть реализован!');
  }
}
export default ParserInterface;

