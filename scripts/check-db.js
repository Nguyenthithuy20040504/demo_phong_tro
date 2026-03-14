const mongoose = require('mongoose');

const fs = require('fs');

async function check() {
  try {
    const uri = 'mongodb+srv://demo_dev:eZGax8m7gkdZ6Tf9@cluster0.mm7io1m.mongodb.net/sample_mflix?retryWrites=true&w=majority&appName=Cluster0';
    await mongoose.connect(uri);

    const ToaNha = mongoose.connection.collection('toanhas');
    const Phong = mongoose.connection.collection('phongs');

    const buildings = await ToaNha.find({}).toArray();
    let result = { buildings: [] };

    for (let b of buildings) {
      const count = await Phong.countDocuments({ toaNha: b._id });
      const rawRooms = await Phong.find({ toaNha: b._id }).toArray();
      
      result.buildings.push({
        name: b.tenToaNha,
        id: b._id.toString(),
        roomCount: count,
        rooms: rawRooms.map(r => ({ maPhong: r.maPhong, status: r.trangThai }))
      });
    }

    fs.writeFileSync('scripts/out.json', JSON.stringify(result, null, 2));
    process.exit(0);
  } catch(e) {
    console.error(e);
    process.exit(1);
  }
}

check();
