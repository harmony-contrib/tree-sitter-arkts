from os.path import isdir, join
from platform import system

try:
    from setuptools import Extension, find_packages, setup
    from setuptools.command.build import build
except ModuleNotFoundError:
    from distutils.core import Extension, setup
    from distutils.command.build import build

    def find_packages(where):
        return ["tree_sitter_arkts"] if isdir(join(where, "tree_sitter_arkts")) else []

try:
    from wheel.bdist_wheel import bdist_wheel
except ModuleNotFoundError:
    bdist_wheel = None


class Build(build):
    def run(self):
        if isdir("queries"):
            dest = join(self.build_lib, "tree_sitter_arkts", "queries")
            self.copy_tree("queries", dest)
        super().run()


if bdist_wheel is not None:
    class BdistWheel(bdist_wheel):
        def get_tag(self):
            python, abi, platform = super().get_tag()
            if python.startswith("cp"):
                python, abi = "cp39", "abi3"
            return python, abi, platform


cmdclass = {
    "build": Build,
}

if bdist_wheel is not None:
    cmdclass["bdist_wheel"] = BdistWheel

setup(
    packages=find_packages("bindings/python"),
    package_dir={"": "bindings/python"},
    package_data={
        "tree_sitter_arkts": ["*.pyi", "py.typed"],
        "tree_sitter_arkts.queries": ["*.scm"],
    },
    ext_package="tree_sitter_arkts",
    ext_modules=[
        Extension(
            name="_binding",
            sources=[
                "bindings/python/tree_sitter_arkts/binding.c",
                "src/parser.c",
                "src/scanner.c",
            ],
            extra_compile_args=[
                "-std=c11",
                "-fvisibility=hidden",
            ] if system() != "Windows" else [
                "/std:c11",
                "/utf-8",
            ],
            define_macros=[
                ("Py_LIMITED_API", "0x03090000"),
                ("PY_SSIZE_T_CLEAN", None),
                ("TREE_SITTER_HIDE_SYMBOLS", None),
            ],
            include_dirs=["src"],
            py_limited_api=True,
        )
    ],
    cmdclass=cmdclass,
    zip_safe=False
)
