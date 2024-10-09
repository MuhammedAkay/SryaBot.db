import SryaBotDB from "./SryaBotDB";

export { SryaBotDB as CreateDB };
export default SryaBotDB;

if (typeof module !== "undefined") {
  module.exports = { CreateDB: SryaBotDB };
  module.exports.default = SryaBotDB;
}
