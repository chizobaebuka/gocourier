interface Package {
    trackingNumber: string;
    currentLocation: google.maps.LatLngLiteral;
    destination: google.maps.LatLngLiteral;
    status: "created" | "in-transit" | "delivered";
}

export const createOrUpdatePackage = (pkg: Package) => {
    const packages = JSON.parse(localStorage.getItem("packages") ?? "[]");
    const existing = packages.findIndex((p: Package) => p.trackingNumber === pkg.trackingNumber);

    if (existing >= 0) {
        packages[existing] = pkg;
    } else {
        packages.push(pkg);
    }

    localStorage.setItem("packages", JSON.stringify(packages));
};

export const getPackage = (trackingNumber: string): Package | undefined => {
    const packages = JSON.parse(localStorage.getItem("packages") ?? "[]");
    return packages.find((p: Package) => p.trackingNumber === trackingNumber);
};