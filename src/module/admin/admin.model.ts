import mongoose, { Document, Model } from 'mongoose';
import bcrypt from 'bcryptjs';

export interface AdminDocument {
    email: string;
    password: string;
    name: string;
};

interface LoginCredentials {
    email: string;
    password: string;
};

interface AdminModel extends Model<AdminDocument> {
    register(info: AdminDocument): Promise<AdminDocument & Document>;
    login(payload: LoginCredentials): Promise<AdminDocument & Document>;
}

const adminSchema = new mongoose.Schema<AdminDocument>({
    email: {
        type: String,
        required: [true, "Please insert an email."]
    },
    password: {
        type: String,
        required: [true, "Please insert a password."]
    },
    name: {
        type: String,
        required: [true, "Please insert a name."]
    }
});

adminSchema.pre('save', function (next) {
    bcrypt.genSalt(10)
        .then((salt) => {
            return bcrypt.hash(this.password, salt)
        })
        .then((hash) => {
            this.password = hash;
            next();
        })
        .catch(() => {
            throw new Error("Error occured when trying to hash the password.");
        })
})

adminSchema.statics.register = function (info: AdminDocument) {
    return this.create({
        email: info.email,
        password: info.password,
        name: info.name
    });
}

adminSchema.statics.login = async function (payload: LoginCredentials) {
    const { email, password } = payload;
    const admin = await Admin.findOne({ email })

    if (!admin) {
        throw new Error("Not found.");
    }
    
    const isIdentical = await bcrypt.compare(password, admin.password);

    if (isIdentical) {
        return admin;
    }

    throw new Error("Not found.");
}
export const Admin = mongoose.model<AdminDocument, AdminModel>('admin', adminSchema);