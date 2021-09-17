const NodeClam = require("clamscan");

async function main() {
  try {
    var options = {
      remove_infected: false, // Removes files if they are infected
      //   quarantine_infected: "~/infected/", // Move file here. remove_infected must be FALSE, though.
      scan_log: "/var/log/node-clam", // You're a detail-oriented security professional.
      debug_mode: true, // This will put some debug info in your js console
      //   file_list: "/home/webuser/scan_files.txt", // path to file containing list of files to scan
      scan_recursively: false, // Choosing false here will save some CPU cycles
      clamscan: {
        path: "/usr/bin/clam", // I dunno, maybe your clamscan is just call "clam"
        scan_archives: false, // Choosing false here will save some CPU cycles
        db: "/usr/bin/better_clam_db", // Path to a custom virus definition database
        active: false, // you don't want to use this at all because it's evil
      },
      clamdscan: {
        // socket: "/var/run/clamd.scan/clamd.sock", // This is pretty typical
        host: "127.0.0.1", // If you want to connect locally but not through socket
        port: 3310, // Because, why not
        timeout: 300000, // 5 minutes
        local_fallback: false, // Use local preferred binary to scan if socket/tcp fails
        // path: "/bin/clamdscan", // Special path to the clamdscan binary on your server
        // config_file: "/etc/clamd.d/daemon.conf", // A fairly typical config location
        multiscan: false, // You hate speed and multi-threaded awesome-sauce
        reload_db: true, // You want your scans to run slow like with clamscan
        active: true, // you don't want to use this at all because it's evil
        bypass_test: true, // Don't check to see if socket is available. You should probably never set this to true.
      },
      preference: "clamdscan", // If clamscan is found and active, it will be used by default
    };
    // Get instance by resolving ClamScan promise object
    const clamscan = await new NodeClam().init(options);
    const version = await clamscan.get_version();
    console.log(`ClamAV Version: ${version}`);
    const { is_infected, file, viruses } = clamscan.is_infected("./RIB.pdf");

    if (is_infected) console.log(`${file} is infected with ${viruses}!`);

    const {
      is_infectedis: is_infectedYES,
      file: fileYES,
      viruses: virusesYES,
    } = clamscan.is_infected("./eicar.txt");

    if (is_infectedYES)
      console.log(`${fileYES} is infected with ${virusesYES}!`);
  } catch (err) {
    // Handle any errors raised by the code in the try block
    console.error("error", err);
  }
}

main();
