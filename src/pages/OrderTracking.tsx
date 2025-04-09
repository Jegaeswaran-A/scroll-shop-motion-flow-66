
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Separator } from '@/components/ui/separator';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Package, Search, Truck, CheckCircle, Clock, AlertCircle } from 'lucide-react';

interface TrackingOrder {
  id: string;
  date: string;
  items: Array<{
    id: string;
    name: string;
    price: number;
    quantity: number;
    image: string;
  }>;
  total: number;
  status: 'processing' | 'shipped' | 'delivered' | 'cancelled';
  customer: {
    name: string;
    email: string;
  };
}

const OrderTracking = () => {
  const navigate = useNavigate();
  const [orderId, setOrderId] = useState('');
  const [order, setOrder] = useState<TrackingOrder | null>(null);
  const [notFound, setNotFound] = useState(false);
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setNotFound(false);
    
    if (!orderId.trim()) return;
    
    const orders = JSON.parse(localStorage.getItem('orders') || '[]');
    const foundOrder = orders.find((o: TrackingOrder) => o.id === orderId);
    
    if (foundOrder) {
      setOrder(foundOrder);
    } else {
      setOrder(null);
      setNotFound(true);
    }
  };
  
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'processing':
        return <Clock className="h-5 w-5 text-amber-500" />;
      case 'shipped':
        return <Truck className="h-5 w-5 text-blue-500" />;
      case 'delivered':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'cancelled':
        return <AlertCircle className="h-5 w-5 text-red-500" />;
      default:
        return <Package className="h-5 w-5" />;
    }
  };
  
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'processing':
        return <Badge variant="outline" className="border-amber-500 text-amber-500">Processing</Badge>;
      case 'shipped':
        return <Badge variant="outline" className="border-blue-500 text-blue-500">Shipped</Badge>;
      case 'delivered':
        return <Badge variant="outline" className="border-green-500 text-green-500">Delivered</Badge>;
      case 'cancelled':
        return <Badge variant="outline" className="border-red-500 text-red-500">Cancelled</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };
  
  const getTrackingSteps = (status: string) => {
    const steps = [
      { id: 'processing', label: 'Order Processing', description: 'We\'ve received your order and are preparing it.' },
      { id: 'shipped', label: 'Order Shipped', description: 'Your order is on its way to you.' },
      { id: 'delivered', label: 'Order Delivered', description: 'Your order has been delivered.' }
    ];
    
    let activeIndex = 0;
    switch (status) {
      case 'processing':
        activeIndex = 0;
        break;
      case 'shipped':
        activeIndex = 1;
        break;
      case 'delivered':
        activeIndex = 2;
        break;
      case 'cancelled':
        return [];
      default:
        activeIndex = -1;
    }
    
    return steps.map((step, index) => ({
      ...step,
      status: index < activeIndex ? 'completed' : index === activeIndex ? 'current' : 'upcoming'
    }));
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-24 pb-16 px-4">
        <div className="container max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold mb-2">Track Your Order</h1>
            <p className="text-muted-foreground">Enter your order number to check its status</p>
          </div>
          
          <Card className="mb-10">
            <CardContent className="p-6">
              <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <Input
                    placeholder="Enter Order Number (e.g. 123456)"
                    value={orderId}
                    onChange={(e) => setOrderId(e.target.value)}
                    required
                  />
                </div>
                <Button type="submit">
                  <Search className="mr-2 h-4 w-4" />
                  Track Order
                </Button>
              </form>
            </CardContent>
          </Card>
          
          {notFound && (
            <Alert variant="destructive" className="mb-10 animate-fade-in">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Order Not Found</AlertTitle>
              <AlertDescription>
                We couldn't find an order with the provided number. Please check and try again.
              </AlertDescription>
            </Alert>
          )}
          
          {order && (
            <div className="animate-fade-in">
              <Card className="mb-8">
                <CardContent className="p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="font-semibold">Order #{order.id}</h2>
                    {getStatusBadge(order.status)}
                  </div>
                  
                  <Separator className="my-4" />
                  
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Order Date</span>
                      <span>{new Date(order.date).toLocaleDateString()}</span>
                    </div>
                    <div className="flex justify-between font-semibold">
                      <span>Total Amount</span>
                      <span>${order.total.toFixed(2)}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              {order.status !== 'cancelled' && (
                <Card className="mb-8">
                  <CardContent className="p-6">
                    <h2 className="font-semibold mb-6">Tracking Details</h2>
                    
                    <div className="space-y-8">
                      {getTrackingSteps(order.status).map((step, index) => (
                        <div key={step.id} className="relative">
                          {index < getTrackingSteps(order.status).length - 1 && (
                            <div 
                              className={`absolute top-7 left-5 ml-px border-l-2 h-12 ${
                                step.status === 'completed' ? 'border-primary' : 'border-muted'
                              }`} 
                            />
                          )}
                          <div className="flex">
                            <div className={`rounded-full p-2 ${
                              step.status === 'completed' ? 'bg-primary/20 text-primary' :
                              step.status === 'current' ? 'bg-primary/10 text-primary' :
                              'bg-muted text-muted-foreground'
                            }`}>
                              {getStatusIcon(step.id)}
                            </div>
                            <div className="ml-4">
                              <h3 className={`font-medium ${
                                step.status !== 'upcoming' ? 'text-foreground' : 'text-muted-foreground'
                              }`}>
                                {step.label}
                              </h3>
                              <p className="text-sm text-muted-foreground">
                                {step.description}
                              </p>
                              {step.status === 'current' && (
                                <p className="text-sm text-primary mt-1 font-medium">
                                  {step.id === 'processing' ? 'Expected to ship in 1-2 days' :
                                   step.id === 'shipped' ? 'Expected delivery in 3-5 days' : ''}
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
              
              <Card>
                <CardContent className="p-6">
                  <h2 className="font-semibold mb-4">Order Items</h2>
                  
                  <div className="space-y-4">
                    {order.items.map(item => (
                      <div key={item.id} className="flex">
                        <div className="w-16 h-16 bg-secondary rounded overflow-hidden flex-shrink-0">
                          <img 
                            src={item.image} 
                            alt={item.name} 
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="ml-4 flex-1">
                          <div className="flex justify-between">
                            <h3 className="font-medium line-clamp-1">{item.name}</h3>
                            <span className="ml-2 whitespace-nowrap">${(item.price * item.quantity).toFixed(2)}</span>
                          </div>
                          <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
          
          {!order && !notFound && (
            <div className="text-center py-12">
              <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h2 className="text-xl font-medium mb-2">Track Your Orders</h2>
              <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                Enter your order number above to see the delivery status and details of your purchase.
              </p>
              <Button onClick={() => navigate('/')}>
                Continue Shopping
              </Button>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default OrderTracking;
