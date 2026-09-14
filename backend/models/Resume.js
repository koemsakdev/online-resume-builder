const mongoose = require('mongoose');

const ResumeSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    title: {
        type: String,
        required: true,
        default: 'Untitled Resume'
    },
    // Supporting both thumbnailLink and legacy thumnailLink
    thumbnailLink: {
        type: String,
        default: ''
    },
    thumnailLink: {
        type: String,
        default: ''
    },
    template: {
        type: String,
        default: 'black_white_minimalist'
    },
    colorPalette: {
        type: [String],
        default: ['#00D2FF', '#8B5CF6']
    },
    status: {
        type: String,
        enum: ['draft', 'published', 'archived'],
        default: 'draft'
    },
    fullName: {
        type: String,
        default: ''
    },
    jobTitle: {
        type: String,
        default: ''
    },
    contactInfo: {
        profileImageUrl: {
            type: String,
            default: ''
        },
        email: {
            type: String,
            default: ''
        },
        phone: {
            type: String,
            default: ''
        },
        address: {
            type: String,
            default: ''
        },
        city: {
            type: String,
            default: ''
        },
        country: {
            type: String,
            default: ''
        },
        postalCode: {
            type: String,
            default: ''
        },
        website: {
            type: String,
            default: ''
        },
        linkedin: {
            type: String,
            default: ''
        },
        github: {
            type: String,
            default: ''
        },
        portfolio: {
            type: String,
            default: ''
        },
        dateOfBirth: {
            type: String,
            default: ''
        },
        maritalStatus: {
            type: String,
            default: ''
        },
        nationality: {
            type: String,
            default: ''
        },
        gender: {
            type: String,
            default: ''
        },
        drivingLicense: {
            type: String,
            default: ''
        },
        visaStatus: {
            type: String,
            default: ''
        },
        photoCrop: {
            x: { type: Number, default: 0 },
            y: { type: Number, default: 0 },
            zoom: { type: Number, default: 1 }
        }
    },
    summary: {
        type: String,
        default: ''
    },
    skills: [{
        skillName: {
            type: String,
            default: ''
        },
        name: {
            type: String,
            default: ''
        },
        proficiency: {
            type: String,
            default: 'Intermediate' // Beginner, Intermediate, Advanced, Expert
        },
        category: {
            type: String,
            default: 'General'
        }
    }],
    experience: [{
        companyName: {
            type: String,
            default: ''
        },
        position: {
            type: String,
            default: ''
        },
        location: {
            type: String,
            default: ''
        },
        startDate: {
            type: Date || String
        },
        endDate: {
            type: Date || String
        },
        isCurrent: {
            type: Boolean,
            default: false
        },
        responsibilities: {
            type: [String],
            default: []
        },
        description: {
            type: String,
            default: ''
        }
    }],
    education: [{
        institution: {
            type: String,
            default: ''
        },
        degree: {
            type: String,
            default: ''
        },
        fieldOfStudy: {
            type: String,
            default: ''
        },
        location: {
            type: String,
            default: ''
        },
        startDate: {
            type: Date || String
        },
        endDate: {
            type: Date || String
        },
        isCurrent: {
            type: Boolean,
            default: false
        },
        gpa: {
            type: String,
            default: ''
        },
        honors: {
            type: [String],
            default: []
        }
    }],
    projects: [{
        title: {
            type: String,
            default: ''
        },
        description: {
            type: String,
            default: ''
        },
        technologies: {
            type: [String],
            default: []
        },
        link: {
            type: String,
            default: ''
        },
        githubLink: {
            type: String,
            default: ''
        },
        startDate: {
            type: Date || String
        },
        endDate: {
            type: Date || String
        }
    }],
    certifications: [{
        name: {
            type: String,
            default: ''
        },
        issuer: {
            type: String,
            default: ''
        },
        issueDate: {
            type: Date || String
        },
        expiryDate: {
            type: Date || String
        },
        credentialId: {
            type: String,
            default: ''
        },
        credentialUrl: {
            type: String,
            default: ''
        }
    }],
    languages: [{
        language: {
            type: String,
            default: ''
        },
        proficiency: {
            type: String,
            default: 'Native'
        }
    }],
    interests: {
        type: [String],
        default: []
    },
    awards: [{
        title: {
            type: String,
            default: ''
        },
        issuer: {
            type: String,
            default: ''
        },
        date: {
            type: Date || String
        },
        description: {
            type: String,
            default: ''
        }
    }],
    references: [{
        name: {
            type: String,
            default: ''
        },
        company: {
            type: String,
            default: ''
        },
        position: {
            type: String,
            default: ''
        },
        email: {
            type: String,
            default: ''
        },
        phone: {
            type: String,
            default: ''
        },
        relationship: {
            type: String,
            default: ''
        }
    }],
    customSections: [{
        sectionTitle: {
            type: String,
            default: ''
        },
        items: [{
            title: {
                type: String,
                default: ''
            },
            subtitle: {
                type: String,
                default: ''
            },
            date: {
                type: String,
                default: ''
            },
            description: {
                type: String,
                default: ''
            }
        }]
    }]
}, { 
    timestamps: true 
});

// Middleware to keep thumbnailLink and thumnailLink synchronized
ResumeSchema.pre('save', function(next) {
    if (this.thumbnailLink && !this.thumnailLink) {
        this.thumnailLink = this.thumbnailLink;
    } else if (this.thumnailLink && !this.thumbnailLink) {
        this.thumbnailLink = this.thumnailLink;
    }
    next();
});

module.exports = mongoose.model('Resume', ResumeSchema);