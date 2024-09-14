

const SideMenu = ({currentItem}:{currentItem:string}) => {
    return (
        <div className="flex h-screen flex-col justify-between border-e bg-white">
            <div className="px-4 py-6">
                <ul className="mt-6 space-y-1">

                    <li>
                        <a
                            href="/"
                            className={`block rounded-lg  px-4 py-2 text-sm font-medium ${currentItem == "仪表盘" ? 'bg-gray-300 text-blue-700' : 'text-gray-500 hover:bg-gray-100 hover:text-gray-700'}`}
                        >
                            仪表盘
                        </a>
                    </li>

                    <li>
                        <details className="group [&_summary::-webkit-details-marker]:hidden">
                            <summary
                                className="flex cursor-pointer items-center justify-between rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                            >
                                <span className="text-sm font-medium"> 检查 </span>

                                <span className="shrink-0 transition duration-300 group-open:-rotate-180">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="size-5"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </span>
                            </summary>

                            <ul className="mt-2 space-y-1 px-4">
                                <li>
                                    <a
                                        href="/Membr"
                                        className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                                    >
                                        列表
                                    </a>
                                </li>

                                <li>
                                    <a
                                        href="#"
                                        className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                                    >
                                        添加
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#"
                                        className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                                    >
                                        统计
                                    </a>
                                </li>
                            </ul>
                        </details>
                    </li>

                    <li>
                        <a
                            href="#"
                            className={`block rounded-lg  px-4 py-2 text-sm font-medium ${currentItem == "人员" ? 'bg-gray-300 text-blue-700' : 'text-gray-500 hover:bg-gray-100 hover:text-gray-700'}`}
                        >
                            人员
                        </a>
                    </li>

                    <li>
                        <a
                            href="#"
                            className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                        >
                            部门
                        </a>
                    </li>

                </ul>
            </div>

            <div className="sticky inset-x-0 bottom-0 border-t border-gray-100">
                <a href="#" className="flex items-center gap-2 bg-white p-4 hover:bg-gray-50">
                    <div>
                        <p className="text-xs">
                            <strong className="block font-medium">https://oldyang.site</strong>

                            <span> 信天翁信息管理系统 </span>
                        </p>
                    </div>
                </a>
            </div>
        </div>
    )
}
export default SideMenu;