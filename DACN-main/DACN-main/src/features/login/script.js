const container = document.querySelector('#containerr');
const containertran = document.querySelector('#containerrtran');
const fileInput = document.querySelector('#file-input');

async function loadTrainingData() {
    const labels = ['Khanh', 'Lisa', 'Nhat', 'Tran']


    const faceDescriptors = []
    for (const label of labels) {
        const descriptors = []
        for (let i = 1; i <= 4; i++) {
            const image = await faceapi.fetchImage(`./data/${label}/${i}.jpeg`)
            const detection = await faceapi.detectSingleFace(image).withFaceLandmarks().withFaceDescriptor()
            descriptors.push(detection.descriptor)
        }
        faceDescriptors.push(new faceapi.LabeledFaceDescriptors(label, descriptors))
    }
    return faceDescriptors
}

var faceMatcher

async function init() {

    await Promise.all([
        faceapi.nets.ssdMobilenetv1.loadFromUri("./models"),
        faceapi.nets.faceLandmark68Net.loadFromUri("./models"),
        faceapi.nets.faceRecognitionNet.loadFromUri("./models"),

    ])


    var trainingData = await loadTrainingData()
    faceMatcher = new faceapi.FaceMatcher(trainingData, 0.6)


    fileInput.addEventListener('change', async(e) => {
        const file = fileInput.files[0];

        const image = await faceapi.bufferToImage(file);
        const canvas = faceapi.createCanvasFromMedia(image)


        container.innerHTML = '';
        container.append(image);
        container.append(canvas)

        const size = {
            width: image.width,
            height: image.height
        }
        faceapi.matchDimensions(canvas, size)
        const detections = await faceapi.detectAllFaces(image).withFaceLandmarks().withFaceDescriptors()
        const resizedDetections = faceapi.resizeResults(detections, size)



        for (const detection of resizedDetections) {
            const drawBox = new faceapi.draw.DrawBox(detection.detection.box, {
                label: faceMatcher.findBestMatch(detection.descriptor).toString(),
            })
            drawBox.draw(canvas)
            let text = faceMatcher.findBestMatch(detection.descriptor).toString();
            const myArray = text.split(" ");
            let word = myArray[0];
            containertran.innerHTML = `<h2> CHÀO MỪNG ${word}</h2>
            <a href="http://localhost:3000/ChiNhanh">Đăng Nhập</a>`
        }
    })



}

init()