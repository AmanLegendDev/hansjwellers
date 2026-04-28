export default function generateTrackingId() {

const random = Math.floor(
100000 + Math.random() * 900000
);

return `HJ${random}`;

}