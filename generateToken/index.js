var storage = require("@azure/storage-blob")
module.exports = async function (context, req) {
    const accountname ="satestaestimostorage";
    const key = "t991fbH0Gol54s/PI3mb2jswElwDH5GYOCbAdMM+QNSBwWdz3ZwwGf5ozUVZgtIRUBr5ZeGcHVTNp8roT9f1rg==";
    const creds = new storage.StorageSharedKeyCredential(accountname,key);
    const containerName = "container-test-aestimo";

// Generate service level SAS for a container
const containerSAS = storage.generateBlobSASQueryParameters({
    containerName, // Required
    permissions: storage.ContainerSASPermissions.parse("racwdl"), // Required
    startsOn: new Date(), // Optional
    expiresOn: new Date(new Date().valueOf() + 86400), // Required. Date type
  },
  creds // StorageSharedKeyCredential - `new StorageSharedKeyCredential(account, accountKey)`
    ).toString();

    var result = {
        storageUri : "https://satestaestimostorage.blob.core.windows.net/",
        storageAccessToken: containerSAS
    }

    context.res = {
        // status: 200, /* Defaults to 200 */
        body: result
    };
}