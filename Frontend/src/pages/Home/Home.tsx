import {
  IconBrevLy,
  IconCopy,
  IconDelete,
  IconDownload,
  IconLinks,
} from "../../assets/Icons";

export function Home() {
  return (
    <div className="py-20 max-w-6xl mx-auto px-6 space-y-8">
      <header className="flex items-center justify-center md:items-start md:justify-start">
        <IconBrevLy />
      </header>
      <div className="grid lg:grid-cols-2 gap-5">
        <form className="bg-white rounded-lg p-6 sm:p-8 flex flex-col gap-6 h-fit">
          <h2 className="text-2xl font-bold text-cinza-600">Novo link</h2>
          <label className="flex flex-col gap-2">
            <span className="text-xs text-cinza-500 uppercase">
              link original
            </span>
            <input
              type="text"
              placeholder="www.exemplo.com.br"
              className="px-4 py-3 border border-cinza-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-base focus:border-transparent transition-all duration-200"
            />
          </label>
          <label className="flex flex-col gap-2">
            <span className="text-xs text-cinza-500 uppercase">
              link encurtado
            </span>
            <input
              type="text"
              placeholder="www.brev.ly/123456"
              className="px-4 py-3 border border-cinza-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-base focus:border-transparent transition-all duration-200"
            />
          </label>
          <button className="cursor-pointer bg-blue-base text-white py-3 rounded-lg disabled:bg-blue-base/50 hover:bg-blue-base/90 transition-colors duration-200">
            Salvar link
          </button>
        </form>
        <div className="bg-white rounded-lg p-6 sm:p-8 flex flex-col gap-6">
          <div className="flex items-center justify-between border-b border-cinza-200 pb-5">
            <h2 className="text-2xl font-bold text-cinza-600">Meus links</h2>
            <button className="cursor-pointer flex items-center gap-2 bg-cinza-200 text-cinza-500 opacity-50 p-2 rounded text-sm hover:opacity-75 hover:bg-cinza-300 transition-all duration-200 disabled:cursor-not-allowed">
              <IconDownload /> Baixar CSV
            </button>
          </div>
          <div className="h-72 overflow-y-auto">
            <div className="flex flex-col py-8 items-center gap-3">
              <IconLinks />
              <p className="text-cinza-500 uppercase text-sm">
                ainda não existem links cadastrados
              </p>
            </div>
            <div className="flex gap-2 sm:gap-4 items-center justify-between border-b border-cinza-200 py-4 hover:bg-gray-50 transition-colors duration-200">
              <div className="flex flex-col w-40 sm:w-64">
                <p className="text-blue-base text-sm sm:text-base font-semibold hover:underline cursor-pointer">
                  brev.ly/Portfolio-Dev
                </p>
                <p className="text-xs sm:text-sm text-cinza-500 truncate">
                  devsite.portfolio.com.br/devname-123456
                </p>
              </div>
              <div className="flex items-center gap-2 sm:gap-4 w-full justify-end">
                <span className="text-xs sm:text-sm text-cinza-500 truncate">
                  30 acessos
                </span>
                <div className="flex gap-1">
                  <button
                    className="bg-cinza-200 cursor-pointer text-cinza-500 p-2 rounded hover:bg-cinza-300 hover:text-cinza-600 transition-all duration-200"
                    title="Copiar link"
                  >
                    <IconCopy />
                  </button>
                  <button
                    className="bg-cinza-200 cursor-pointer text-cinza-500 p-2 rounded hover:bg-cinza-300 hover:text-cinza-600 transition-all duration-200"
                    title="Excluir link"
                  >
                    <IconDelete />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
