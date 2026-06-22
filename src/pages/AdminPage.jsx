import { useMemo, useState } from 'react';
import { STORE_SETTINGS, formatCurrency } from '../config/storeSettings';
import { getCartTotal } from '../utils/cart';
import { DashboardIcon, PackageIcon, ClipboardListIcon, UsersIcon, TruckIcon, SettingsIcon, ShieldIcon, MessageCircleIcon } from '../components/icons';

const ADMIN_TABS = [
  { id: 'admin-dashboard', label: 'Dashboard', icon: <DashboardIcon /> },
  { id: 'admin-products', label: 'Products', icon: <PackageIcon /> },
  { id: 'admin-orders', label: 'Orders', icon: <ClipboardListIcon /> },
  { id: 'admin-customers', label: 'Customers', icon: <UsersIcon /> },
  { id: 'admin-delivery', label: 'Delivery', icon: <TruckIcon /> },
  { id: 'admin-settings', label: 'Settings', icon: <SettingsIcon /> },
];

function statusClass(status) {
  return `admin-status admin-status-${status.toLowerCase().replaceAll(' ', '-')}`;
}

function formatOrderDate(value) {
  if (!value) return 'Not saved yet';
  return new Intl.DateTimeFormat('en', {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  }).format(new Date(value));
}

function getOrderTotal(order) {
  return getCartTotal(order.items || []);
}

function getCustomerName(order) {
  return order.details?.customer?.name || 'Guest customer';
}

function getCustomerPhone(order) {
  const country = order.details?.customer?.countryCode || '';
  const phone = order.details?.customer?.phone || 'No phone saved';
  return `${country} ${phone}`.trim();
}


const SALES_PERIODS = [
  { id: 'hours', label: 'Hours', helper: 'Last 8 hours' },
  { id: 'days', label: 'Days', helper: 'Last 7 days' },
  { id: 'months', label: 'Months', helper: 'Last 6 months' },
  { id: 'years', label: 'Years', helper: 'Last 4 years' },
];

const SALES_CHART_TYPES = [
  { id: 'bar', label: 'Bar chart' },
  { id: 'line', label: 'Line chart' },
  { id: 'donut', label: 'Category donut' },
];

const SALES_CATEGORIES = [
  { id: 'all', label: 'All categories' },
  { id: 'honey', label: 'Honey' },
  { id: 'pb', label: 'Peanut butter' },
  { id: 'porridge', label: 'Porridge' },
];

function getCategoryLabel(category) {
  return SALES_CATEGORIES.find((item) => item.id === category)?.label || category;
}

function getBucketKey(date, period) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hour = String(date.getHours()).padStart(2, '0');

  if (period === 'hours') return `${year}-${month}-${day}-${hour}`;
  if (period === 'days') return `${year}-${month}-${day}`;
  if (period === 'months') return `${year}-${month}`;
  return `${year}`;
}

function getBucketLabel(date, period) {
  if (period === 'hours') return date.toLocaleTimeString([], { hour: 'numeric' });
  if (period === 'days') return date.toLocaleDateString([], { weekday: 'short', month: 'short', day: 'numeric' });
  if (period === 'months') return date.toLocaleDateString([], { month: 'short', year: '2-digit' });
  return String(date.getFullYear());
}

function getEmptyBuckets(period) {
  const count = period === 'hours' ? 8 : period === 'days' ? 7 : period === 'months' ? 6 : 4;
  const buckets = [];
  const now = new Date();

  for (let i = count - 1; i >= 0; i -= 1) {
    const date = new Date(now);
    if (period === 'hours') date.setHours(now.getHours() - i, 0, 0, 0);
    if (period === 'days') date.setDate(now.getDate() - i);
    if (period === 'months') date.setMonth(now.getMonth() - i, 1);
    if (period === 'years') date.setFullYear(now.getFullYear() - i, 0, 1);

    buckets.push({
      key: getBucketKey(date, period),
      label: getBucketLabel(date, period),
      honey: 0,
      pb: 0,
      porridge: 0,
      total: 0,
    });
  }

  return buckets;
}

function getDemoSalesRows(period) {
  const labels = {
    hours: ['12 AM', '3 AM', '6 AM', '9 AM', '12 PM', '3 PM', '6 PM', '9 PM'],
    days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    years: ['2023', '2024', '2025', '2026'],
  }[period];

  const values = {
    hours: [[28, 8, 14], [12, 6, 10], [36, 14, 28], [74, 29, 48], [98, 31, 64], [84, 42, 72], [132, 58, 91], [66, 22, 39]],
    days: [[210, 75, 112], [180, 58, 96], [245, 88, 130], [264, 94, 144], [320, 118, 166], [410, 146, 210], [290, 102, 158]],
    months: [[1200, 480, 790], [1450, 520, 860], [1720, 690, 980], [1980, 740, 1120], [2250, 830, 1310], [2520, 920, 1480]],
    years: [[9800, 4200, 6200], [12800, 5100, 7600], [16400, 6500, 9400], [20800, 7800, 11800]],
  }[period];

  return labels.map((label, index) => {
    const [honey, pb, porridge] = values[index];
    return { label, honey, pb, porridge, total: honey + pb + porridge };
  });
}

function getSalesRows({ products, orderHistory, period }) {
  if (!orderHistory.length) return getDemoSalesRows(period);

  const productById = new Map(products.map((product) => [product.id, product]));
  const buckets = getEmptyBuckets(period);
  const bucketMap = new Map(buckets.map((bucket) => [bucket.key, bucket]));

  orderHistory.forEach((order) => {
    const orderDate = new Date(order.createdAt || Date.now());
    const bucket = bucketMap.get(getBucketKey(orderDate, period));
    if (!bucket) return;

    (order.items || []).forEach((item) => {
      const product = productById.get(item.id);
      const category = product?.category || 'porridge';
      const amount = Number(item.finalPrice || 0) * Number(item.quantity || 1);
      if (bucket[category] !== undefined) bucket[category] += amount;
      bucket.total += amount;
    });
  });

  return buckets;
}

function getCategoryTotals(rows) {
  return rows.reduce((totals, row) => ({
    honey: totals.honey + row.honey,
    pb: totals.pb + row.pb,
    porridge: totals.porridge + row.porridge,
    total: totals.total + row.total,
  }), { honey: 0, pb: 0, porridge: 0, total: 0 });
}

function AdminSalesChart({ rows, chartType, category }) {
  const totals = getCategoryTotals(rows);
  const valueKey = category === 'all' ? 'total' : category;
  const maxValue = Math.max(...rows.map((row) => row[valueKey]), 1);
  const totalSales = totals[valueKey] || 0;

  if (chartType === 'line') {
    const width = 640;
    const height = 220;
    const padX = 32;
    const padY = 26;
    const points = rows.map((row, index) => {
      const x = rows.length === 1 ? width / 2 : padX + (index * (width - padX * 2)) / (rows.length - 1);
      const y = height - padY - ((row[valueKey] || 0) / maxValue) * (height - padY * 2);
      return `${x},${y}`;
    }).join(' ');

    return (
      <div className="admin-sales-chart admin-sales-line-chart" aria-label="Sales line chart">
        <svg viewBox={`0 0 ${width} ${height}`} role="img">
          <polyline points={points} />
          {rows.map((row, index) => {
            const x = rows.length === 1 ? width / 2 : padX + (index * (width - padX * 2)) / (rows.length - 1);
            const y = height - padY - ((row[valueKey] || 0) / maxValue) * (height - padY * 2);
            return <circle key={row.label} cx={x} cy={y} r="5" />;
          })}
        </svg>
        <div className="admin-sales-axis">
          {rows.map((row) => <span key={row.label}>{row.label}</span>)}
        </div>
      </div>
    );
  }

  if (chartType === 'donut') {
    const safeTotal = totals.total || 1;
    const honeyPct = (totals.honey / safeTotal) * 100;
    const pbPct = (totals.pb / safeTotal) * 100;
    const porridgePct = Math.max(0, 100 - honeyPct - pbPct);

    return (
      <div className="admin-sales-chart admin-sales-donut-wrap">
        <div
          className="admin-sales-donut"
          style={{ '--honey-pct': `${honeyPct}%`, '--pb-pct': `${pbPct}%`, '--porridge-pct': `${porridgePct}%` }}
          aria-label="Sales category donut chart"
        >
          <span>
            <strong>{formatCurrency(totalSales)}</strong>
            <small>{getCategoryLabel(category)}</small>
          </span>
        </div>
        <div className="admin-sales-legend">
          <span><i className="legend-honey" /> Honey · {formatCurrency(totals.honey)}</span>
          <span><i className="legend-pb" /> Peanut butter · {formatCurrency(totals.pb)}</span>
          <span><i className="legend-porridge" /> Porridge · {formatCurrency(totals.porridge)}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-sales-chart admin-sales-bar-chart" aria-label="Sales bar chart">
      {rows.map((row) => {
        const value = row[valueKey] || 0;
        const width = `${Math.max(3, (value / maxValue) * 100)}%`;
        return (
          <div className="admin-sales-bar-row" key={row.label}>
            <span>{row.label}</span>
            <div className="admin-sales-bar-track"><i style={{ width }} /></div>
            <strong>{formatCurrency(value)}</strong>
          </div>
        );
      })}
    </div>
  );
}

function AdminSalesAnalytics({ products, orderHistory }) {
  const [period, setPeriod] = useState('days');
  const [category, setCategory] = useState('all');
  const [chartType, setChartType] = useState('bar');

  const rows = useMemo(() => getSalesRows({ products, orderHistory, period }), [products, orderHistory, period]);
  const totals = useMemo(() => getCategoryTotals(rows), [rows]);
  const activePeriod = SALES_PERIODS.find((item) => item.id === period);
  const activeValue = category === 'all' ? totals.total : totals[category];
  const topCategory = ['honey', 'pb', 'porridge']
    .map((id) => ({ id, value: totals[id] }))
    .sort((a, b) => b.value - a.value)[0];

  return (
    <section className="admin-panel admin-sales-panel">
      <div className="admin-panel-head admin-sales-head">
        <div>
          <h2>Sales analytics</h2>
          <p className="admin-muted-copy">View sales by hours, days, months, or years. Filter by category and switch chart style.</p>
        </div>
        <span className="admin-sales-source">{orderHistory.length ? 'Using saved local orders' : 'Demo chart data until real sales exist'}</span>
      </div>

      <div className="admin-sales-toolbar" aria-label="Sales analytics controls">
        <div>
          <span>Time range</span>
          <div className="admin-segmented-options">
            {SALES_PERIODS.map((item) => (
              <button key={item.id} type="button" className={period === item.id ? 'is-active' : ''} onClick={() => setPeriod(item.id)}>
                {item.label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <span>Category</span>
          <div className="admin-segmented-options">
            {SALES_CATEGORIES.map((item) => (
              <button key={item.id} type="button" className={category === item.id ? 'is-active' : ''} onClick={() => setCategory(item.id)}>
                {item.label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <span>Chart type</span>
          <div className="admin-segmented-options">
            {SALES_CHART_TYPES.map((item) => (
              <button key={item.id} type="button" className={chartType === item.id ? 'is-active' : ''} onClick={() => setChartType(item.id)}>
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="admin-sales-summary-grid">
        <article><span>Selected sales</span><strong>{formatCurrency(activeValue || 0)}</strong><small>{getCategoryLabel(category)} · {activePeriod?.helper}</small></article>
        <article><span>Top category</span><strong>{getCategoryLabel(topCategory?.id)}</strong><small>{formatCurrency(topCategory?.value || 0)} in this range</small></article>
        <article><span>Average per point</span><strong>{formatCurrency((activeValue || 0) / Math.max(rows.length, 1))}</strong><small>{rows.length} chart points</small></article>
      </div>

      <AdminSalesChart rows={rows} chartType={chartType} category={category} />
    </section>
  );
}

function AdminShell({ activePage, setPage, children }) {
  return (
    <main className="admin-page">
      <aside className="admin-sidebar" aria-label="Store owner admin navigation">
        <div className="admin-brand-card">
          <ShieldIcon />
          <span>
            <strong>Store owner</strong>
            <small>Frontend admin preview</small>
          </span>
        </div>

        <nav className="admin-nav">
          {ADMIN_TABS.map((tab) => (
            <button
              key={tab.id}
              type="button"
              className={activePage === tab.id ? 'is-active' : ''}
              onClick={() => setPage(tab.id)}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </nav>

        <button className="admin-storefront-btn" type="button" onClick={() => setPage('shop')}>← View storefront</button>

        <div className="admin-hidden-note">
          <strong>Hidden from customers</strong>
          <span>This area does not appear in the normal header, mobile menu, subnav, or footer links.</span>
        </div>
      </aside>

      <section className="admin-content">
        {children}
      </section>
    </main>
  );
}

function AdminHeader({ title, eyebrow, description }) {
  return (
    <header className="admin-header">
      <p className="eyebrow">{eyebrow}</p>
      <h1>{title}</h1>
      <p>{description}</p>
    </header>
  );
}

function AdminDashboard({ products, orderHistory, setPage }) {
  const stats = useMemo(() => {
    const revenue = orderHistory.reduce((sum, order) => sum + getOrderTotal(order), 0);
    const customers = new Set(orderHistory.map((order) => getCustomerPhone(order))).size;
    return [
      { label: 'Products listed', value: products.length, helper: 'Frontend product catalog' },
      { label: 'Saved orders', value: orderHistory.length, helper: 'Orders saved in this browser' },
      { label: 'Local revenue preview', value: formatCurrency(revenue), helper: 'Before delivery/shipping fees' },
      { label: 'Known customers', value: customers || 0, helper: 'Based on saved WhatsApp orders' },
    ];
  }, [products, orderHistory]);

  const lowStockPreview = products.slice(0, 4).map((product, index) => ({
    ...product,
    stock: [24, 8, 16, 5][index] || 12,
  }));

  return (
    <>
      <AdminHeader
        eyebrow="Owner dashboard"
        title="Admin overview"
        description="A private frontend preview for the business owner to monitor products, WhatsApp orders, customers, delivery, and store settings before the real backend is added."
      />

      <div className="admin-stat-grid">
        {stats.map((stat) => (
          <article className="admin-stat-card" key={stat.label}>
            <span>{stat.label}</span>
            <strong>{stat.value}</strong>
            <small>{stat.helper}</small>
          </article>
        ))}
      </div>

      <AdminSalesAnalytics products={products} orderHistory={orderHistory} />

      <div className="admin-two-column">
        <section className="admin-panel">
          <div className="admin-panel-head">
            <h2>Recent WhatsApp orders</h2>
            <button type="button" onClick={() => setPage('admin-orders')}>View all</button>
          </div>
          {orderHistory.length === 0 ? (
            <div className="admin-empty-mini">No saved local orders yet. Orders will appear here after a test WhatsApp checkout.</div>
          ) : (
            <div className="admin-list">
              {orderHistory.slice(0, 5).map((order) => (
                <div className="admin-list-row" key={order.id}>
                  <span>
                    <strong>{getCustomerName(order)}</strong>
                    <small>{formatOrderDate(order.createdAt)} · {getCustomerPhone(order)}</small>
                  </span>
                  <b>{formatCurrency(getOrderTotal(order))}</b>
                </div>
              ))}
            </div>
          )}
        </section>

        <section className="admin-panel">
          <div className="admin-panel-head">
            <h2>Stock preview</h2>
            <button type="button" onClick={() => setPage('admin-products')}>Manage</button>
          </div>
          <div className="admin-list">
            {lowStockPreview.map((product) => (
              <div className="admin-list-row" key={product.id}>
                <span>
                  <strong>{product.name}</strong>
                  <small>{product.size} · {product.categoryName}</small>
                </span>
                <span className={product.stock <= 8 ? 'admin-stock-pill is-low' : 'admin-stock-pill'}>{product.stock} left</span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}

function AdminProducts({ products }) {
  return (
    <>
      <AdminHeader
        eyebrow="Catalog manager"
        title="Products"
        description="Preview where the owner will add, edit, hide, restock, and price products once the Turso database and admin security are connected."
      />
      <section className="admin-panel">
        <div className="admin-panel-head">
          <h2>Product catalog</h2>
          <button type="button">+ Add product placeholder</button>
        </div>
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Product</th>
                <th>Category</th>
                <th>Size</th>
                <th>Price</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product, index) => (
                <tr key={product.id}>
                  <td>
                    <span className="admin-product-cell">
                      <img src={product.image} alt="" loading="lazy" decoding="async" />
                      <span>
                        <strong>{product.name}</strong>
                        <small>{product.description}</small>
                      </span>
                    </span>
                  </td>
                  <td>{product.categoryName}</td>
                  <td>{product.size}</td>
                  <td>{formatCurrency(product.finalPrice)}</td>
                  <td><span className={index % 5 === 0 ? statusClass('Low stock') : statusClass('Active')}>{index % 5 === 0 ? 'Low stock' : 'Active'}</span></td>
                  <td><button type="button" className="admin-mini-btn">Edit</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}

function AdminOrders({ orderHistory }) {
  const fallbackOrders = [
    { id: 'CNF-DEMO-001', createdAt: new Date().toISOString(), customer: 'Demo Ghana customer', phone: '+233 0244 000000', total: 90, status: 'WhatsApp sent' },
    { id: 'CNF-DEMO-002', createdAt: new Date().toISOString(), customer: 'Demo USA customer', phone: '+1 208 403 8352', total: 150, status: 'Needs quote' },
  ];

  const rows = orderHistory.length
    ? orderHistory.map((order) => ({
        id: order.id,
        createdAt: order.createdAt,
        customer: getCustomerName(order),
        phone: getCustomerPhone(order),
        total: getOrderTotal(order),
        status: 'WhatsApp sent',
      }))
    : fallbackOrders;

  return (
    <>
      <AdminHeader
        eyebrow="Order desk"
        title="Orders"
        description="A place for the owner to review WhatsApp order requests, confirm stock, add delivery fees, mark payment, and update status later."
      />
      <section className="admin-panel">
        <div className="admin-panel-head">
          <h2>Order queue</h2>
          <button type="button">Export placeholder</button>
        </div>
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Order</th>
                <th>Customer</th>
                <th>Phone</th>
                <th>Total</th>
                <th>Status</th>
                <th>Next action</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((order) => (
                <tr key={order.id}>
                  <td><strong>{order.id}</strong><small>{formatOrderDate(order.createdAt)}</small></td>
                  <td>{order.customer}</td>
                  <td>{order.phone}</td>
                  <td>{formatCurrency(order.total)}</td>
                  <td><span className={statusClass(order.status)}>{order.status}</span></td>
                  <td><button type="button" className="admin-mini-btn">Open order</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}

function AdminCustomers({ orderHistory }) {
  const customers = orderHistory.length
    ? orderHistory.map((order) => ({
        name: getCustomerName(order),
        phone: getCustomerPhone(order),
        location: order.details?.customer?.location || 'No location saved',
        orders: 1,
      }))
    : [
        { name: 'Demo Ghana customer', phone: '+233 0244 000000', location: 'Accra, Ghana', orders: 1 },
        { name: 'Demo USA customer', phone: '+1 208 403 8352', location: 'Idaho, USA', orders: 1 },
      ];

  return (
    <>
      <AdminHeader
        eyebrow="Customer records"
        title="Customers"
        description="A future customer list for saved phone numbers, delivery areas, order history, and repeat buyers."
      />
      <section className="admin-panel admin-customer-grid">
        {customers.map((customer, index) => (
          <article className="admin-customer-card" key={`${customer.phone}-${index}`}>
            <UsersIcon />
            <strong>{customer.name}</strong>
            <span>{customer.phone}</span>
            <small>{customer.location}</small>
            <b>{customer.orders} order{customer.orders === 1 ? '' : 's'}</b>
          </article>
        ))}
      </section>
    </>
  );
}

function AdminDelivery() {
  const deliveryRows = [
    { area: 'Accra / Tema', carrier: 'Local rider', status: 'Manual quote', eta: 'Same day / next day' },
    { area: 'Other Ghana regions', carrier: 'Bus courier / local courier', status: 'Manual quote', eta: '1–3 days' },
    { area: 'USA', carrier: 'DHL / FedEx / UPS later', status: 'Tracking API placeholder', eta: 'Depends on shipment' },
  ];

  return (
    <>
      <AdminHeader
        eyebrow="Fulfillment"
        title="Delivery"
        description="A preview for managing delivery quotes, courier choices, package tracking numbers, and international shipment status."
      />
      <section className="admin-panel">
        <div className="admin-panel-head">
          <h2>Delivery zones</h2>
          <button type="button">Add zone placeholder</button>
        </div>
        <div className="admin-delivery-grid">
          {deliveryRows.map((row) => (
            <article className="admin-delivery-card" key={row.area}>
              <TruckIcon />
              <strong>{row.area}</strong>
              <span>{row.carrier}</span>
              <small>{row.status}</small>
              <b>{row.eta}</b>
            </article>
          ))}
        </div>
      </section>

      <section className="admin-panel admin-tracking-panel">
        <h2>Future tracking workflow</h2>
        <ol>
          <li>Owner adds courier name and tracking number.</li>
          <li>Backend/Vercel Function calls the carrier or multi-carrier tracking API.</li>
          <li>Customer sees updates on the delivery page.</li>
        </ol>
      </section>
    </>
  );
}

function AdminSettings() {
  const regions = Object.values(STORE_SETTINGS.checkout.regions);
  return (
    <>
      <AdminHeader
        eyebrow="Store controls"
        title="Settings"
        description="Frontend settings preview for business numbers, checkout destinations, brand details, payment placeholders, and future admin security."
      />
      <div className="admin-two-column">
        <section className="admin-panel">
          <h2>WhatsApp destinations</h2>
          <div className="admin-list">
            {regions.map((region) => (
              <div className="admin-list-row" key={region.id}>
                <span>
                  <strong>{region.label} checkout</strong>
                  <small>{region.helper}</small>
                </span>
                <b>{region.businessWhatsappDisplay}</b>
              </div>
            ))}
          </div>
        </section>

        <section className="admin-panel">
          <h2>Security later</h2>
          <p className="admin-muted-copy">This admin route is hidden from customers, but it is not secure yet. When the business goes live, protect it with real authentication, role checks, server-side validation, and database permissions.</p>
          <button type="button" className="admin-security-btn"><ShieldIcon /> Security coming later</button>
        </section>
      </div>
    </>
  );
}

export function AdminPage({ activePage, setPage, products, orderHistory }) {
  const [noticeDismissed, setNoticeDismissed] = useState(false);

  function renderAdminTab() {
    switch (activePage) {
      case 'admin-products':
        return <AdminProducts products={products} />;
      case 'admin-orders':
        return <AdminOrders orderHistory={orderHistory} />;
      case 'admin-customers':
        return <AdminCustomers orderHistory={orderHistory} />;
      case 'admin-delivery':
        return <AdminDelivery />;
      case 'admin-settings':
        return <AdminSettings />;
      default:
        return <AdminDashboard products={products} orderHistory={orderHistory} setPage={setPage} />;
    }
  }

  return (
    <AdminShell activePage={activePage} setPage={setPage}>
      {!noticeDismissed ? (
        <div className="admin-warning">
          <MessageCircleIcon />
          <span><strong>Prototype only:</strong> this admin is hidden from customer navigation, but it is not protected by login yet.</span>
          <button type="button" onClick={() => setNoticeDismissed(true)}>Dismiss</button>
        </div>
      ) : null}
      {renderAdminTab()}
    </AdminShell>
  );
}
