import express from 'express';
import Seo from '../models/Seo.js';
import Service from '../models/Service.js';
import Course from '../models/Course.js';
import Blog from '../models/Blog.js';

const router = express.Router();

const DEFAULT_SEO_PAGES = [
  {
    pageSlug: 'home',
    pageName: 'Home Page',
    metaTitle: 'Digital Orra | Premier Performance Marketing & Web Development Agency',
    metaDescription: 'Digital Orra is a top-tier digital marketing agency in Chandigarh providing Performance Marketing, Meta Ads, Google Ads, SEO, and Web Development.',
    focusKeywords: 'digital marketing agency, performance marketing, seo company, web development',
    canonicalUrl: 'https://digitalorra.com/',
    ogImage: '/logo.png'
  },
  {
    pageSlug: 'about-us',
    pageName: 'About Us Page',
    metaTitle: 'About Us | Digital Orra Agency Leadership & Growth Experts',
    metaDescription: 'Learn about Digital Orra, our team of performance marketers, media buyers, and full-stack developers helping brands scale revenue globally.',
    focusKeywords: 'about digital orra, marketing team, agency leaders',
    canonicalUrl: 'https://digitalorra.com/about-us',
    ogImage: '/logo.png'
  },
  {
    pageSlug: 'services',
    pageName: 'Services Page',
    metaTitle: 'Core Digital Marketing & Tech Development Services | Digital Orra',
    metaDescription: 'Explore full-service performance marketing, SEO, Meta ads, Google PPC, video editing, and custom web & app development solutions.',
    focusKeywords: 'digital marketing services, meta ads agency, google ppc, web development',
    canonicalUrl: 'https://digitalorra.com/services',
    ogImage: '/logo.png'
  },
  {
    pageSlug: 'courses',
    pageName: 'Courses Academy Page',
    metaTitle: 'Digital Marketing & AI Academy Courses | Digital Orra',
    metaDescription: 'Industry-oriented practical training courses in Digital Marketing, AI Automation, SEO, Video Editing, and Full Stack Web Development.',
    focusKeywords: 'digital marketing course, ai marketing training, web development course',
    canonicalUrl: 'https://digitalorra.com/courses',
    ogImage: '/logo.png'
  },
  {
    pageSlug: 'blog',
    pageName: 'Blog & Articles Page',
    metaTitle: 'Latest Marketing Insights, SEO Trends & Growth Guides | Digital Orra Blog',
    metaDescription: 'Read expert insights on Meta ad scaling, SEO strategies, AEO, GEO, AI marketing workflows, and web performance optimization.',
    focusKeywords: 'marketing blog, seo guides, meta ad strategies, ai growth',
    canonicalUrl: 'https://digitalorra.com/blog',
    ogImage: '/logo.png'
  },
  {
    pageSlug: 'gallery',
    pageName: 'Gallery Page',
    metaTitle: 'Life at Digital Orra | Office Culture, Events & Moments Gallery',
    metaDescription: 'Take a peek inside Digital Orra office life, team achievements, celebration moments, and agency culture gallery.',
    focusKeywords: 'digital orra gallery, office life, team events',
    canonicalUrl: 'https://digitalorra.com/gallery',
    ogImage: '/logo.png'
  },
  {
    pageSlug: 'career',
    pageName: 'Careers Page',
    metaTitle: 'Join Our Team | Careers & Job Openings at Digital Orra',
    metaDescription: 'Explore open job roles in performance marketing, video editing, media buying, SEO, and full-stack web development at Digital Orra.',
    focusKeywords: 'digital marketing jobs, web developer careers, media buyer jobs',
    canonicalUrl: 'https://digitalorra.com/join-our-team',
    ogImage: '/logo.png'
  },
  {
    pageSlug: 'contact-us',
    pageName: 'Contact Us Page',
    metaTitle: 'Contact Digital Orra | Get Free Marketing Audit & Proposal',
    metaDescription: 'Get in touch with Digital Orra performance experts. Schedule a free agency strategy audit and project consultation today.',
    focusKeywords: 'contact digital orra, get marketing proposal, free agency audit',
    canonicalUrl: 'https://digitalorra.com/contact-us',
    ogImage: '/logo.png'
  },
  {
    pageSlug: 'scan-qr',
    pageName: 'Scan QR Code Page',
    metaTitle: 'Scan QR | Digital Orra Quick Connect & Digital Assets',
    metaDescription: 'Scan Digital Orra QR code for instant agency contact, portfolio deck, and consultation booking.',
    focusKeywords: 'digital orra qr, scan qr code',
    canonicalUrl: 'https://digitalorra.com/scan-qr',
    ogImage: '/logo.png'
  },
  {
    pageSlug: 'our-team',
    pageName: 'Our Team Page',
    metaTitle: 'Meet Our Experts | Digital Orra Leadership & Media Buyers',
    metaDescription: 'Meet the performance marketers, developers, and media buyers scaling revenue for Digital Orra clients.',
    focusKeywords: 'digital orra team, marketing experts',
    canonicalUrl: 'https://digitalorra.com/our-team',
    ogImage: '/logo.png'
  },
  {
    pageSlug: 'faqs',
    pageName: 'FAQs Page',
    metaTitle: 'Frequently Asked Questions | Digital Orra Agency & Academy',
    metaDescription: 'Find answers to common questions about Digital Orra performance marketing services, pricing, and training courses.',
    focusKeywords: 'digital marketing faqs, digital orra pricing',
    canonicalUrl: 'https://digitalorra.com/faqs',
    ogImage: '/logo.png'
  },
  {
    pageSlug: 'portfolio',
    pageName: 'Portfolio Page',
    metaTitle: 'Client Portfolio & Case Studies | Digital Orra Agency',
    metaDescription: 'Explore featured client case studies, web design projects, performance marketing results, and brand identities.',
    focusKeywords: 'digital marketing portfolio, web design projects, case studies',
    canonicalUrl: 'https://digitalorra.com/portfolio',
    ogImage: '/logo.png'
  },
  {
    pageSlug: 'academy',
    pageName: 'Academy Training Page',
    metaTitle: 'Digital Orra Academy | Practical Marketing & AI Training',
    metaDescription: 'Learn performance marketing, AI automation, SEO, and web development with hands-on live agency client projects.',
    focusKeywords: 'digital marketing academy, ai marketing training',
    canonicalUrl: 'https://digitalorra.com/academy',
    ogImage: '/logo.png'
  },
  {
    pageSlug: 'it-company',
    pageName: 'IT & Software Development Page',
    metaTitle: 'IT & Software Development Solutions | Digital Orra',
    metaDescription: 'Custom web application development, ERP/CRM software, mobile apps, and scalable IT infrastructure development.',
    focusKeywords: 'it company, custom software development, web app development',
    canonicalUrl: 'https://digitalorra.com/it-company',
    ogImage: '/logo.png'
  },
  {
    pageSlug: 'company-profile',
    pageName: 'Company Profile Deck Page',
    metaTitle: 'Company Profile & Capabilities | Digital Orra',
    metaDescription: 'Download and view Digital Orra agency capabilities deck, team experience, client portfolio, and growth services.',
    focusKeywords: 'digital orra company profile, agency deck',
    canonicalUrl: 'https://digitalorra.com/company-profile',
    ogImage: '/logo.png'
  },
  {
    pageSlug: 'testimonial',
    pageName: 'Client Testimonials Page',
    metaTitle: 'Client Reviews & Testimonials | Digital Orra',
    metaDescription: 'Read what top business founders and brand owners say about Digital Orra marketing services and growth results.',
    focusKeywords: 'digital orra reviews, client testimonials',
    canonicalUrl: 'https://digitalorra.com/testimonial',
    ogImage: '/logo.png'
  }
];

// Seed default SEO items if missing
async function seedDefaultSeo() {
  for (const item of DEFAULT_SEO_PAGES) {
    const exists = await Seo.findOne({ pageSlug: item.pageSlug });
    if (!exists) {
      await Seo.create(item);
    }
  }
}

// GET all SEO pages
router.get('/', async (req, res) => {
  try {
    await seedDefaultSeo();
    const list = await Seo.find({}).sort({ updatedAt: -1 });
    res.json(list);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching SEO settings', error: err.message });
  }
});

// Dynamic XML Sitemap route (Includes ALL main pages, services, courses, and blog posts)
router.get('/sitemap.xml', async (req, res) => {
  try {
    await seedDefaultSeo();
    const seoPages = await Seo.find({});
    
    // Fetch dynamic sub-pages from database
    const servicesList = await Service.find({});
    const blogsList = await Blog.find({});

    let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
    xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

    // 1. Base / Core Pages
    seoPages.forEach(p => {
      const loc = p.canonicalUrl || `https://digitalorra.com/${p.pageSlug === 'home' ? '' : p.pageSlug}`;
      xml += `  <url>\n`;
      xml += `    <loc>${loc}</loc>\n`;
      xml += `    <lastmod>${new Date(p.updatedAt).toISOString().split('T')[0]}</lastmod>\n`;
      xml += `    <changefreq>weekly</changefreq>\n`;
      xml += `    <priority>${p.pageSlug === 'home' ? '1.0' : '0.8'}</priority>\n`;
      xml += `  </url>\n`;
    });

    // 2. All Service Detail Pages
    servicesList.forEach(s => {
      const slug = (s.id && !/^[0-9a-fA-F]{24}$/.test(s.id))
        ? s.id 
        : (s.title ? s.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') : String(s._id));
      xml += `  <url>\n`;
      xml += `    <loc>https://digitalorra.com/service/${slug}</loc>\n`;
      xml += `    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>\n`;
      xml += `    <changefreq>weekly</changefreq>\n`;
      xml += `    <priority>0.8</priority>\n`;
      xml += `  </url>\n`;
    });

    // 3. All Blog Post Detail Pages
    blogsList.forEach(b => {
      const slug = (b.id && !/^[0-9a-fA-F]{24}$/.test(b.id))
        ? b.id 
        : (b.title ? b.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') : String(b._id));
      xml += `  <url>\n`;
      xml += `    <loc>https://digitalorra.com/blog/${slug}</loc>\n`;
      xml += `    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>\n`;
      xml += `    <changefreq>monthly</changefreq>\n`;
      xml += `    <priority>0.7</priority>\n`;
      xml += `  </url>\n`;
    });

    xml += `</urlset>`;

    res.header('Content-Type', 'application/xml');
    res.send(xml);
  } catch (err) {
    console.error('Sitemap generation error:', err);
    res.status(500).send('Error generating sitemap XML');
  }
});

// GET single page SEO by slug
router.get('/:slug', async (req, res) => {
  try {
    await seedDefaultSeo();
    let item = await Seo.findOne({ pageSlug: req.params.slug });
    if (!item) {
      item = await Seo.findOne({ pageSlug: 'home' });
    }
    res.json(item);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching page SEO', error: err.message });
  }
});

// POST / PUT update page SEO
router.post('/', async (req, res) => {
  try {
    const { pageSlug, pageName, metaTitle, metaDescription, focusKeywords, canonicalUrl, ogImage } = req.body;
    
    if (!pageSlug || !metaTitle || !metaDescription) {
      return res.status(400).json({ message: 'pageSlug, metaTitle and metaDescription are required' });
    }

    const updated = await Seo.findOneAndUpdate(
      { pageSlug },
      {
        pageSlug,
        pageName: pageName || pageSlug,
        metaTitle,
        metaDescription,
        focusKeywords: focusKeywords || '',
        canonicalUrl: canonicalUrl || '',
        ogImage: ogImage || '',
        updatedAt: Date.now()
      },
      { new: true, upsert: true }
    );

    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: 'Error updating SEO setting', error: err.message });
  }
});

export default router;
