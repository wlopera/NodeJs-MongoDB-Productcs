const excelGenerator = (products, namefile, res) => {
  const xl = require("excel4node");

  products = products.map((product) => {
    const id = product._id.toString();
    delete product._id;
    return {
      id,
      ...product,
    };
  });

  const wb = new xl.Workbook();
  const ws = wb.addWorksheet("Inventario");

  for (let i = 1; i <= products.length; i++) {
    for (let j = 1; j <= Object.values(products[0]).length; j++) {
      if (i === 1) {
        const data = Object.keys(products[i - 1])[j - 1];
        ws.cell(i, j).string(data.toUpperCase());
      }
      const data = Object.values(products[i - 1])[j - 1];
      typeof data === "string"
        ? ws.cell(i + 1, j).string(data)
        : ws.cell(i + 1, j).number(data);
    }
  }

  wb.write(`${namefile}.xlsx`, res);
};

module.exports.ProductsUtil = {
  excelGenerator,
};
