fn main() {
    let root_dir = std::path::Path::new(".");
    let src_dir = root_dir.join("src");
    let common_dir = root_dir.join("common");

    let mut config = cc::Build::new();
    config.include(&src_dir);
    config
        .flag_if_supported("-std=c11")
        .flag_if_supported("-Wno-unused-parameter");

    for path in &[
        src_dir.join("parser.c"),
        src_dir.join("scanner.c"),
    ] {
        config.file(path);
        println!("cargo:rerun-if-changed={}", path.to_str().unwrap());
    }

    println!(
        "cargo:rerun-if-changed={}",
        common_dir.join("scanner.h").to_str().unwrap()
    );

    config.compile("tree-sitter-arkts");
}
