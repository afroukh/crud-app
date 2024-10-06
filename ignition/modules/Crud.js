const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("CrudModule", (m) => {

  const crud = m.contract("Crud");

  return { crud };
});